import grpc from "@grpc/grpc-js";
import { addService, type GRPCFunc, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";

export default function addModule(server: grpc.Server) {
	const coreService = loadProtoService(
		"proto/core/core.proto",
		"core",
		"IndexLedger",
	);
	addService(server, coreService, "RecordTransaction", recordTransaction);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		"SayHello",
		hello,
	);
}
