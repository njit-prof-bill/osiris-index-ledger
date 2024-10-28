import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
		{
			RecordTransaction: recordTransaction,
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}
