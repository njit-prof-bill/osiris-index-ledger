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
	client.ResolveLedger(
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