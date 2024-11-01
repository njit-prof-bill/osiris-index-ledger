import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export function loadProtoService(path, packageName, serviceName) {
    const protoPath = __dirname + "/" + path;
    const packageDefinition = protoLoader.loadSync(protoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const packageDef = grpc.loadPackageDefinition(packageDefinition)[packageName];
    const proto = packageDef[serviceName];
    return proto;
}
export function addService(server, proto, rpcs) {
    server.addService(proto.service, rpcs);
}
