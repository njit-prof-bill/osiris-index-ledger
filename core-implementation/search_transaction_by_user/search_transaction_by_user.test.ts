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

test("search transactions by user", (done) => {
	// Add mock data to the ledger for testing
	ledger.push(
		new core.Transaction({
			transaction_id: "txn-123",
			sender: "user1",
			receiver: "user2",
			amount: 120.0,
			timestamp: "2024-10-20T12:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn-125",
			sender: "user1",
			receiver: "user3",
			amount: 30.0,
			timestamp: "2024-10-20T13:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn-126",
			sender: "user3",
			receiver: "user4",
			amount: 50.0,
			timestamp: "2024-10-21T14:00:00Z",
		}),
	);

	// Test API to search transactions by user "user1"
	client.SearchTransactionsByUser(
		new core.UserId({ user_id: "user1" }),
		(err, response) => {
			done();
			expect(err).toBeNull();
			expect(response?.list.length).toEqual(2);
			expect(response?.list[0].transaction_id).toEqual("txn-123");
			expect(response?.list[1].transaction_id).toEqual("txn-125");

			// Testing
			//console.log("Length: " + response?.list.length);
			//console.log("list[0] = " + response?.list[0].transaction_id);
			//console.log("list[1] = " + response?.list[1].transaction_id);
		},
	);
});
