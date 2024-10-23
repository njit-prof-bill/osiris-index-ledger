import grpc from "@grpc/grpc-js";
import { addService, type GRPCFunc, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		"SayHello",
		hello,
	);
}
