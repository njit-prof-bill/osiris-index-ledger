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

test("record a transaction", (done) => {
	client.RecordTransaction(
		new core.Transaction({
			transaction_id: "123",
			sender: "me",
			receiver: "you",
			amount: 500,
			timestamp: "2024-10-20T12:00:00Z",
		}),
		function (err: ServiceError | null, response: core.Status | undefined) {
			done();
			expect(response?.succeeded).toEqual(true);
		},
	);
});
