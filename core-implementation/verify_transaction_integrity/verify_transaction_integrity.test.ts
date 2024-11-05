import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../../core-implementation/verify_transaction_integrity/verify_transaction_integrity.js";

// Client setup for IndexLedger service
let client: core.IndexLedgerClient;

beforeAll(async () => {
	await serverUp;
	client = new core.IndexLedgerClient(
		target,
		grpc.credentials.createInsecure(),
	);

	// Populate the ledger with sample data for testing
	ledger.push(
		new core.Transaction({
			transaction_id: "txn1",
			sender: "user1",
			receiver: "user2",
			amount: 100.0,
			timestamp: "2024-01-01T00:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn2",
			sender: "user3",
			receiver: "user4",
			amount: 200.0,
			timestamp: "2024-01-02T00:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn3",
			sender: "user1",
			receiver: "user4",
			amount: 400.0,
			timestamp: "2024-01-03T00:00:00Z",
		}),
	);
});

afterAll(() => {
	server.forceShutdown();
});

test("verify transaction integrity - transaction exists", (done) => {
	client.VerifyTransactionIntegrity(
		new core.TransactionId({ transaction_id: "txn1" }),
		function (err: ServiceError | null, response: core.Status | undefined) {
			done();

			expect(err).toBeNull();
			expect(response).toBeDefined();
			expect(response?.succeeded).toEqual(true);
		},
	);
});
