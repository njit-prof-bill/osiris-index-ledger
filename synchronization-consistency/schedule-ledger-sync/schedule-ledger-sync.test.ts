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

test("should successfully schedule daily sync", (done) => {
    client.ScheduleLedgerSync(
        new sync.Interval({ interval: "daily" }),
        function (err: grpc.ServiceError | null, response: sync.Status | undefined) {
            done();
            expect(response?.succeeded).toEqual(true);
        }
    )
})

test("should successfully schedule hourly sync", (done) => {
    client.ScheduleLedgerSync(
        new sync.Interval({ interval: "hourly" }),
        function (err: grpc.ServiceError | null, response: sync.Status | undefined)
        {
            done();
            expect(response?.succeeded).toEqual(true);
        }
    )
});

test("should successfully schedule weekly sync", (done) => {
    client.ScheduleLedgerSync(
        new sync.Interval({ interval: "weekly" }),
        function (err: grpc.ServiceError | null, response: sync.Status | undefined)
        {
            done();
            expect(response?.succeeded).toEqual(true);
        }
    )
});

test("should return false for invalid interval", (done) => {
    client.ScheduleLedgerSync(
        new sync.Interval({ interval: "monthly" }),
        function (err: Error | null, response: sync.Status | undefined)
        {
            done();
            console.log(err?.message);
            expect(response?.succeeded).toEqual(false);
        }
    )
});

test("should return false for empty interval", (done) => {
    client.ScheduleLedgerSync(
        new sync.Interval({ interval: "" }),
        function (err: Error | null, response: sync.Status | undefined)
        {
            done();
            console.log(err?.message);
            expect(response?.succeeded).toEqual(false);
        }
    )
});