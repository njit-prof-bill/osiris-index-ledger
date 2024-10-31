import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Populated with transaction data
export const ledger: core.Transaction[] = [];

// TODO: Integrate with a real database
export const searchTransactionByUser: handleUnaryCall<
	core.UserId,
	core.TransactionList
> = (request, respond) => {
	// Extract the user ID
	const userID = request.request.user_id;

	// Filter transactions by user ID  (retrieves transactions where the user is sender or receiver)
	const userTransactions = ledger.filter(
		(transaction) =>
			transaction.sender === userID || transaction.receiver === userID,
	);

	// Create a TransactionList response object with the filtered transactions.
	const TransactionList = new core.TransactionList({
		list: userTransactions,
	});

	// Send the response back to the client with the TransactionList data.
	respond(null, TransactionList);
};
