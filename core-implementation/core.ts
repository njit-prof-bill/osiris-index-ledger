import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";
import { GetTransactionDetails } from "./get_transaction_details/get_transaction_details.js";
import { searchTransactionByUser } from "./search_transaction_by_user/search_transaction_by_user.js";
import { getAccountBalance } from "./get_account_balance/get_account_balance.js";
import { updateTransaction } from "./update_transaction/update_transaction.js";
import { calculateTotalLedgerValue } from "./calculate_total_ledger_value/calculate_total_ledger_value.js";
import { verifyTransactionIntegrity } from "./verify_transaction_integrity/verify_transaction_integrity.js";
import { deleteTransaction } from "./delete_transaction/delete_transaction.js";
import { auditLedger } from "./audit_ledger/audit_ledger.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
		{
			RecordTransaction: recordTransaction,
			GetTransactionDetails: GetTransactionDetails,
			SearchTransactionsByUser: searchTransactionByUser,
			UpdateTransaction: updateTransaction,
			CalculateTotalLedgerValue: calculateTotalLedgerValue,
			VerifyTransactionIntegrity: verifyTransactionIntegrity,
			GetAccountBalance: getAccountBalance,
			DeleteTransaction: deleteTransaction,
			AuditLedger: auditLedger,
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}
