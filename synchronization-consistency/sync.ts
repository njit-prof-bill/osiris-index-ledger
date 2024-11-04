import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { ForceLedgerReconciliation } from "./force_ledger_reconciliation/force_ledger_reconciliation.js"
//import { BroadcastTransaction } from "./broadcast_transaction_to_nodes/broadcast_transaction_to_nodes.js";
/* Add APIs here as we complete them. */

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro"),
		{
			//BroadcastTransaction: BroadcastTransaction,
			ForceLedgerReconciliation: ForceLedgerReconciliation,
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}