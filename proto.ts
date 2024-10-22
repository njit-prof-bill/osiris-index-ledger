import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadProtoService(
	path: string,
	packageName: string,
	serviceName: string,
): grpc.ServiceClientConstructor {
	const protoPath = __dirname + "/" + path;
	const packageDefinition = protoLoader.loadSync(protoPath, {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});
	const packageDef = grpc.loadPackageDefinition(packageDefinition)[
		packageName
	] as grpc.GrpcObject;
	const proto = packageDef[serviceName] as grpc.ServiceClientConstructor;
	return proto;
}

export function addService<ReqType, ResType>(
	server: grpc.Server,
	proto: grpc.ServiceClientConstructor,
	rpcName: string,
	rpcFunc: GRPCFunc<ReqType, ResType>,
) {
	const impl: grpc.UntypedServiceImplementation = {};
	impl[rpcName] = rpcFunc;
	server.addService(proto.service, impl);
}

export type GRPCFunc<ReqType, ResType> = (
	call: grpc.ServerUnaryCall<ReqType, ResType>,
	callback: grpc.sendUnaryData<ResType>,
) => void;
