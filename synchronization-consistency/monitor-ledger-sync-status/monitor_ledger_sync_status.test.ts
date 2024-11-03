import grpc, { status } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { sync } from "../../generated/sync/sync.js";
import { monitorLedgerSyncStatus } from "./monitor_ledger_sync_status.js";

let client : sync.IndexSynchroClient;

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

test("monitor ledger sync status", (done) => {
    
	client.MonitorLedgerSyncStatus(
		new sync.Null(),
		function (err: grpc.ServiceError | null, response: sync.SyncStatus | undefined) {
			done();
			expect(err).toBeNull();
			expect(response?.status).toEqual("syncing");
            expect(response?.progress).toEqual(85);
            expect(response?.errors.length).toEqual(0);
		},
	);
});