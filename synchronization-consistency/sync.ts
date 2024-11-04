import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { syncLedger } from "./sync_ledger/sync_ledger.js";
import { fetchMissingTransactions } from "./fetch_missing_transactions_command/fetch.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro"),
		{
			SyncLedger: syncLedger,
			FetchMissingTransactions: fetchMissingTransactions
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}