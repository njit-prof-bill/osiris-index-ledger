import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main-aces.js";
import { helloworld } from "../../generated/hello.js";

let client: helloworld.GreeterClient;
beforeAll(async () => {
	await serverUp;
	client = new helloworld.GreeterClient(
		target,
		grpc.credentials.createInsecure(),
	);
});

afterAll(() => {
	server.forceShutdown();
});

test("hello", (done) => {
	client.SayHello(
		new helloworld.HelloRequest({
			name: "the tester",
		}),
		function (
			err: ServiceError | null,
			response: helloworld.HelloReply | undefined,
		) {
			done();
			expect(response?.message).toEqual("hello, the tester!!!");
		},
	);
});