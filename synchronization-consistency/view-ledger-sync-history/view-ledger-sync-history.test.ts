import { sync } from '../../generated/sync/sync.js';
import { server, serverUp, target } from '../../main.js';
import * as grpc from '@grpc/grpc-js';

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

test("should return 2 lines from ledger sync event list", (done) => {
    client.ViewLedgerSyncHistory(
        new sync.Limit({ limit: 2 }),
        function (err: Error | null, response: sync.SyncEventList | undefined) {
            done();
            const syncEvents = response?.sync_list;

            /* Check if the array is of the expected length. */
            expect(syncEvents).toHaveLength(2);

            /* Check if each object has the right data. */
            expect(syncEvents).toEqual([
                expect.objectContaining({
                    "timestamp": "2024-10-19T10:00:00Z",
                    "status": "successful"
                }),
                expect.objectContaining({
                    "timestamp": "2024-10-18T10:00:00Z",
                    "status": "failed"
                })
            ]);
        }
    )
})

test("should return all 3 lines by default", (done) => {
    client.ViewLedgerSyncHistory(
        new sync.Limit({}),
        function (err: Error | null, response: sync.SyncEventList | undefined) {
            done();
            const syncEvents = response?.sync_list;

            /* Check if the array is of the expected length. */
            expect(syncEvents).toHaveLength(3);

            /* Check if each object has the right data. */
            expect(syncEvents).toEqual([
                expect.objectContaining({
                    "timestamp": "2024-10-19T10:00:00Z",
                    "status": "successful"
                }),
                expect.objectContaining({
                    "timestamp": "2024-10-18T10:00:00Z",
                    "status": "failed"
                }),
                expect.objectContaining({
                    "timestamp": "2024-10-17T10:00:00Z",
                    "status": "successful"
                })
            ]);
        }
    )
})