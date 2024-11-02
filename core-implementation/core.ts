import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";
import { searchTransactionByUser } from "./search_transaction_by_user/search_transaction_by_user.js";
import { getAccountBalance } from "./get_account_balance/get_account_balance.js";
import { calculateTotalLedgerValue } from "./calculate_total_ledger_value/calculate_total_ledger_value.js";
import { verifyTransactionIntegrity } from "./verify_transaction_integrity/verify_transaction_integrity.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
		{
			RecordTransaction: recordTransaction,
			SearchTransactionsByUser: searchTransactionByUser,
			CalculateTotalLedgerValue: calculateTotalLedgerValue,
			VerifyTransactionIntegrity: verifyTransactionIntegrity,
			GetAccountBalance: getAccountBalance,
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}
