import grpc from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";
import { server, serverUp, target } from "../../main.js";
let client;
beforeAll(async () => {
    await serverUp;
    client = new sync.IndexSynchroClient(target, grpc.credentials.createInsecure());
});
afterAll(() => {
    server.forceShutdown();
});
test("sync ledger", (done) => {
    client.SyncLedger(new sync.Null({}), function (err, response) {
        done();
        expect(response?.succeeded).toEqual(true);
    });
});
