import grpc from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { sync } from "../../generated/sync/sync.js";
let client;
beforeAll(async () => {
    await serverUp;
    client = new sync.IndexSynchroClient(target, grpc.credentials.createInsecure());
});
afterAll(() => {
    server.forceShutdown();
});
test("set to latest", (done) => {
    client.SetLedgerConflictResolutionStrategy(new sync.Strategy({ strategy: "latest" }), function (err, response) {
        done();
        expect(err).toBeNull();
        expect(response?.succeeded).toEqual(true);
    });
});
test("set to whatever", (done) => {
    client.SetLedgerConflictResolutionStrategy(new sync.Strategy({ strategy: "whatever" }), function (err, response) {
        done();
        expect(err).toBeNull();
        expect(response?.succeeded).toEqual(false);
    });
});
