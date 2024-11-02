import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { scheduleLedgerSync } from "./schedule-ledger-sync/schedule-ledger-sync.js";
import { resolveLedgerConflict } from "./resolve-ledger-conflict/resolve-ledger-conflict.js";
export default function addModule(server) {
    addService(server, loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro"), {
        ScheduleLedgerSync: scheduleLedgerSync,
        ResolveLedgerConflict: resolveLedgerConflict,
    });
    addService(server, loadProtoService("proto/hello.proto", "helloworld", "Greeter"), { SayHello: hello });
}
