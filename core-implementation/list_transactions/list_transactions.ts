import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

var test_list: core.Transaction[] = [];
for (let i = 0; i < 100; i++) {
	test_list.push(new core.Transaction({ transaction_id: i.toString() }));
}

export const listTransactions: handleUnaryCall<
	core.TransactionLimit,
	core.TransactionList
> = (request, respond) => {
	// request.request.limit defaults to undefined because of "optional" in core.proto
	var limit = request.request.limit;
	// set default to 100
	if (limit == undefined) {
		limit = 100;
	}
	console.log(limit);

	// retreive limit number of transactions from database and assemble into list
	var list_of_transactions: core.Transaction[] = [];
	for (let i = 0; i < limit; i++) {
		// TODO: actually retrieve transactions from database
		try {
			list_of_transactions.push(test_list[i]);
		} catch {
			break;
		}
	}

	respond(
		null,
		new core.TransactionList({
			list: list_of_transactions,
		}),
	);
};
