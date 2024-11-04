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

test("should return true for a successful reconciliation", (done) => {
	client.ForceLedgerReconciliation(
		new sync.Null(),
		function (err: Error | null, response: sync.Status | undefined) {
			done();
			const status = response?.succeeded;

			// Expect reconciliation to work
			expect(status).toBe(true);
		},
	);
});

/*
describe('forceLedgerReconciliation', () => {
    it('should return true when reconciliation is successful', () => {
        const result = ForceLedgerReconciliation();
        expect(result).toBe(true);
    });
}); 
*/
