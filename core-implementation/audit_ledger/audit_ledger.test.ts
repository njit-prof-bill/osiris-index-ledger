import grpc from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../../core-implementation/audit_ledger/audit_ledger.js";

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

test("audit ledger for discrepancies/invalid entries and generate report", (done) => {
	// Added mock data to the ledger for testing
	ledger.push(
		new core.Transaction({
			transaction_id: "txn-123",
			sender: "user1",
			receiver: "user2",
			amount: 100.0,
			timestamp: "2024-10-20T12:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn-123", // Duplicate ID
			sender: "", // Missing sender
			receiver: "user3",
			amount: -100.0, // Invalid amount
			timestamp: "2024-10-20T12:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn-125",
			sender: "user4",
			receiver: "", // Missing receiver
			amount: 200.0,
			timestamp: "", // Missing timestamp
		}),
	);

	// Getting the number of discrepancies and issues
	client.AuditLedger(new core.Null(), (err, response) => {
		done();
		expect(err).toBeNull();
		expect(response?.discrepancies_found).toEqual("5"); // Should expect 5 discrepancies
		expect(response?.issues.length).toBe(5); // Should expect 5 placeholders
	});
});
