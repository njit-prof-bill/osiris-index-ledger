import grpc, { status } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { sync } from "../../generated/sync/sync.js";
import { setLedgerConflictResolutionStrategy } from "./set_ledger_conflict_resolution_strategy.js";

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

test("set ledger conflict resolution strategy", (done) => {
    
	client.SetLedgerConflictResolutionStrategy(
		new sync.Strategy({strategy:"latest"}) ,
		(err, response) => {

			done();
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(true);

		},
	);

  client.SetLedgerConflictResolutionStrategy(
		new sync.Strategy({strategy:"whatever"}) ,
		(err, response) => {

			done();
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(false);

		},
	);
});