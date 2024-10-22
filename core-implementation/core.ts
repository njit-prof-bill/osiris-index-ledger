import grpc from "@grpc/grpc-js";
import { addService, type GRPCFunc, loadProtoService } from "../proto.ts";
import { helloworld } from "../generated/hello.ts";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService(
			"proto/hello.proto",
			"helloworld",
			"Greeter",
		),
		"hello",
		hello,
	);
}

const hello: GRPCFunc<helloworld.HelloRequest, helloworld.HelloReply> = (
	request,
	respond,
) => {
	respond(
		{
			code: grpc.status.OK,
		},
		new helloworld.HelloReply({
			message: `hello, ${request.request.name}!!!`,
		}),
	);
};
