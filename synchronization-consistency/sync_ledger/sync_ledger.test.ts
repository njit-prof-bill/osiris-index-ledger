import grpc, { ServiceError } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";
import { server, serverUp, target } from "../../main-aces.js";

let client: sync.IndexSynchroClient
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

test("sync ledger", (done) =>  {
    client.SyncLedger(
            new sync.Null({
            }),
        
            function(err: ServiceError | null, response: sync.Status | undefined) {
                done();
                expect(response?.succeeded).toEqual(true);
            },
    );
});

