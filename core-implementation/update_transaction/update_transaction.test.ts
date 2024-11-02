import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../search_transaction_by_user/search_transaction_by_user.js";

let client: core.IndexLedgerClient;
beforeAll(async () => {
	await serverUp;
	client = new core.IndexLedgerClient(
		target,
		grpc.credentials.createInsecure(),
	);
});

afterAll(() => {
	server.forceShutdown();
});

test("update transaction command", (done) => {
	// Add mock data to the ledger for testing
	ledger.length = 0; // Clear ledger to avoid conflicts
	ledger.push(
		new core.Transaction({
			transaction_id: "txn-123",
			sender: "user1",
			receiver: "user2",
			amount: 120.0,
			timestamp: "2024-10-20T12:00:00Z",
		}),
		new core.Transaction({
			// Balance = -120 + 60 = -60
			transaction_id: "txn-124",
			sender: "user2",
			receiver: "user1",
			amount: 60.0,
			timestamp: "2024-10-20T13:00:00Z",
		}),
		new core.Transaction({
			// Balance = -60 - 30 = -90
			transaction_id: "txn-125",
			sender: "user1",
			receiver: "user3",
			amount: 30.0,
			timestamp: "2024-10-20T14:00:00Z",
		}),
	);

	client.UpdateTransaction(
		new core.TransactionUpdate({
			transaction_id: "txn-123",
			sender: "user6",
			amount: 112,
		}),
		function (err: ServiceError | null, response: core.Status | undefined) {
			done();
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(true);
		},
	);
});
