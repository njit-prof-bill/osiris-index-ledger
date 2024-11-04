import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main-aces.js";
import { sync } from "../../generated/sync/sync.js";

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
test("detectConflict1", (done) => {
    client.DetectLedgerConflicts(
		new sync.Null(),
        function (err: Error | null, response: sync.ConflictList | undefined) {
            done();
            const syncConflicts = response?.conflict_list;

            /* Check if each object has the right data. */
            expect(syncConflicts).toEqual([
                expect.objectContaining({
					"transaction_id": "txn-123", 
					"conflicting_transaction": "txn-999", 
					"reason": "duplicate transaction" 
                }),
                expect.objectContaining({
                    "transaction_id": "txn-124", 
					"conflicting_transaction": "txn-1000", 
					"reason": "mismatched amounts"
                })
            ]);
        }
    )
})