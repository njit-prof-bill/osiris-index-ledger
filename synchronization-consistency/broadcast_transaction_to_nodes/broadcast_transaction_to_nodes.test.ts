import { sync } from "../../generated/sync/sync.js";
import { server, serverUp, target } from "../../main.js";
import * as grpc from "@grpc/grpc-js";

/* Define client. */
let client: sync.IndexSynchroClient;
beforeAll(async () => {
	await serverUp;
	client = new sync.IndexSynchroClient(
		target,
		grpc.credentials.createInsecure(),
	);
});

afterAll(() => {
	server.forceShutdown();
});

test("should return true for succesfully broadcasting trasaction to all nodes", (done) => {
	client.BroadcastTransaction(
		new sync.TransactionId(),
		function (err: Error | null, response: sync.Status | undefined) {
			done();
			const status = response?.succeeded;

			// Expect reconciliation to work
			expect(status).toBe(true);
		},
	);
});
