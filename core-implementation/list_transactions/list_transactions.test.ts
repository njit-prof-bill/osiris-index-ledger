import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";

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
//TODO: record 5 transactions
test("list 5 transactions", (done) => {
	const test_limit = 5;
	client.ListTransactions(
		new core.TransactionLimit({
			limit: test_limit,
		}),
		function (
			err: ServiceError | null,
			response: core.TransactionList | undefined,
		) {
			done();
			expect(response?.list.length).toEqual(test_limit);
		},
	);
});

test("list default number of transactions (100)", (done) => {
	const test_limit = 100;
	client.ListTransactions(
		new core.TransactionLimit(), // TransactionLimit.limit defaults to 100
		function (
			err: ServiceError | null,
			response: core.TransactionList | undefined,
		) {
			done();
			expect(response?.list.length).toEqual(test_limit);
		},
	);
});
