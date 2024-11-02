import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { monitorLedgerSyncStatus } from "./monitor_ledger_sync_status/monitor_ledger_sync_status.js";
/* Add APIs here as we complete them. */
export default function addModule(server) {
    /*addService(
        server,
        loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro"),
        {
        },
    );*/
    addService(server, loadProtoService("proto/hello.proto", "helloworld", "Greeter"), { SayHello: hello });
    const syncService = loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro");
    addService(server, syncService, {
        monitorLedgerSyncStatus: monitorLedgerSyncStatus
    });
}
