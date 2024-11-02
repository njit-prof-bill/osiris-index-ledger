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
        function (err: Error | null, response: sync.SyncEventList | undefined)
        {
            done();
            const syncEvents = response?.toObject();
            console.log(syncEvents);
        }
    )
})