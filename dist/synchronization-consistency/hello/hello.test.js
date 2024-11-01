import grpc from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { helloworld } from "../../generated/hello.js";
let client;
beforeAll(async () => {
    await serverUp;
    client = new helloworld.GreeterClient(target, grpc.credentials.createInsecure());
});
afterAll(() => {
    server.forceShutdown();
});
test("hello", (done) => {
    client.SayHello(new helloworld.HelloRequest({
        name: "the tester",
    }), function (err, response) {
        done();
        expect(response?.message).toEqual("hello, the tester!!!");
    });
});
