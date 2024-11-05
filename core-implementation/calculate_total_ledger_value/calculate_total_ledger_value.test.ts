import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../../core-implementation/calculate_total_ledger_value/calculate_total_ledger_value.js";

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
			amount: 200.0,
			timestamp: "2024-01-01T00:00:00Z",
		}),
		new core.Transaction({
			transaction_id: "txn2",
			sender: "user3",
			receiver: "user4",
			amount: 300.0,
			timestamp: "2024-01-02T00:00:00Z",
		}),
	);
});

afterAll(() => {
	server.forceShutdown();
});

test("calculate total ledger value", (done) => {
	client.CalculateTotalLedgerValue(
		new core.Null(),
		function (
			err: ServiceError | null,
			response: core.CurrencyValue | undefined,
		) {
			done();

			// Expected total value in the ledger
			const expectedTotalValue = 500.0;

			expect(err).toBeNull();
			expect(response).toBeDefined();
			expect(response?.value).toEqual(expectedTotalValue);
		},
	);
});
