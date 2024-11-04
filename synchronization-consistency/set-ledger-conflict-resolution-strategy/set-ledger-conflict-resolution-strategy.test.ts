import grpc, { status } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
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

test("set to latest", (done) => {
	client.SetLedgerConflictResolutionStrategy(
		new sync.Strategy({ strategy: "latest" }),
		function (
			err: grpc.ServiceError | null,
			response: sync.Status | undefined,
		) {
			done();
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(true);
		},
	);
});

test("set to whatever", (done) => {
	client.SetLedgerConflictResolutionStrategy(
		new sync.Strategy({ strategy: "whatever" }),
		function (
			err: grpc.ServiceError | null,
			response: sync.Status | undefined,
		) {
			done();
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(false);
		},
	);
});
