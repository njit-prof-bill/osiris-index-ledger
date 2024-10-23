import grpc from "@grpc/grpc-js";
import { addService, type GRPCFunc, loadProtoService } from "../proto.js";
import { helloworld } from "../generated/hello.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		"SayHello",
		hello,
	);
}

const hello: GRPCFunc<helloworld.HelloRequest, helloworld.HelloReply> = (
	request,
	respond,
) => {
	const message = `hello, ${request.request.name}!!!`;
	console.log(message);
	respond(
		null,
		new helloworld.HelloReply({
			message,
		}),
	);
};
