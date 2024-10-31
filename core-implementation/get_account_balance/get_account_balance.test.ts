import grpc from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../../core-implementation/search_transaction_by_user/search_transaction_by_user.js";

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

test("get account balance", (done) => {
	// Ensures there are no conflicts
	ledger.length = 0;

	// Add mock data to the ledger for testing
	ledger.push(
		new core.Transaction({
			// Balance = -120
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

	client.GetAccountBalance(
		new core.UserId({ user_id: "user1" }),
		(err, response) => {
			done();
			expect(err).toBeNull();
			// Expects -90
			expect(response?.value).toEqual(-90.0);

			// Was used to verify what was actually outputted
			//console.log("Message: " + response?.value);
		},
	);
});
