import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
/* Add APIs here as we complete them. */
export default function addModule(server) {
    /*addService(
        server,
        loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
        {
        },
    );*/
    addService(server, loadProtoService("proto/hello.proto", "helloworld", "Greeter"), { SayHello: hello });
}
