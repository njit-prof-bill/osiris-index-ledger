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
//TODO record transaction

test("get a transaction", (done) => {
	let test_id = "123";
	client.GetTransactionDetails(
		new core.TransactionId({
			transaction_id: test_id,
		}),
		function (
			err: ServiceError | null,
			response: core.Transaction | undefined,
		) {
			done();
			expect(response?.transaction_id).toEqual(test_id);
			//TODO make sure response transaction details match recorded transaction details
		},
	);
});
