import { sync } from '../../generated/sync/sync.js';
import { server, serverUp, target } from '../../main.js';
import * as grpc from '@grpc/grpc-js';
/* Define client. */
let client;
beforeAll(async () => {
    await serverUp;
    client = new sync.IndexSynchroClient(target, grpc.credentials.createInsecure());
});
afterAll(() => {
    server.forceShutdown();
});
test("should successfully schedule daily sync", (done) => {
    client.ScheduleLedgerSync(new sync.Interval({ interval: "daily" }), function (err, response) {
        done();
        expect(response?.succeeded).toEqual(true);
    });
});
test("should successfully schedule hourly sync", (done) => {
    client.ScheduleLedgerSync(new sync.Interval({ interval: "hourly" }), function (err, response) {
        done();
        expect(response?.succeeded).toEqual(true);
    });
});
test("should successfully schedule weekly sync", (done) => {
    client.ScheduleLedgerSync(new sync.Interval({ interval: "weekly" }), function (err, response) {
        done();
        expect(response?.succeeded).toEqual(true);
    });
});
test("should return false for invalid interval", (done) => {
    client.ScheduleLedgerSync(new sync.Interval({ interval: "monthly" }), function (err, response) {
        done();
        console.log(err?.message);
        expect(response?.succeeded).toEqual(false);
    });
});
test("should return false for empty interval", (done) => {
    client.ScheduleLedgerSync(new sync.Interval({ interval: "" }), function (err, response) {
        done();
        console.log(err?.message);
        expect(response?.succeeded).toEqual(false);
    });
});
