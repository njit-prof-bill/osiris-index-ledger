import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { scheduleLedgerSync } from "./schedule-ledger-sync/schedule-ledger-sync.js";
import { viewLedgerSyncHistory } from "./view-ledger-sync-history/view-ledger-sync-history.js";
import { resolveLedgerConflict } from "./resolve-ledger-conflict/resolve-ledger-conflict.js";
/* Add APIs here as we complete them. */

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro"),
		{
			ScheduleLedgerSync: scheduleLedgerSync,
			ViewLedgerSyncHistory: viewLedgerSyncHistory,
			ResolveLedgerConflict: resolveLedgerConflict,
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}