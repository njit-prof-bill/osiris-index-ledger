import grpc, { ServiceError } from "@grpc/grpc-js";
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

test("resolveLatest", (done) => {
	client.ResolveLedgerConflict(
		new sync.ConflictResolver({
			transaction_id: "1",
			resolution_strategy: "latest",

		}),
		function (err: ServiceError | null, response: sync.Status | undefined) {
			done();
			expect(response?.succeeded).toEqual(true);
		},
	);
});

test("resolveLatest", (done) => {
	client.ResolveLedgerConflict(
		new sync.ConflictResolver({
			transaction_id: "1",
			resolution_strategy: "merge",

		}),
		function (err: ServiceError | null, response: sync.Status | undefined) {
			done();
			expect(response?.succeeded).toEqual(true);
		},
	);
});

test("resolveLatest", (done) => {
	client.ResolveLedgerConflict(
		new sync.ConflictResolver({
			transaction_id: "1",
			resolution_strategy: "manual",

		}),
		function (err: ServiceError | null, response: sync.Status | undefined) {
			done();
			expect(response?.succeeded).toEqual(true);
		},
	);
});

test("resolveLatest", (done) => {
	client.ResolveLedgerConflict(
		new sync.ConflictResolver({
			transaction_id: "1",
			resolution_strategy: "error",

		}),
		function (err: ServiceError | null, response: sync.Status | undefined) {
			done();
			expect(response?.succeeded).toEqual(false);
		},
	);
});