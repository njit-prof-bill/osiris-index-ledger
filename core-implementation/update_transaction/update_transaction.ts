import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../search_transaction_by_user/search_transaction_by_user.js";

// Define handler for updating a transaction based on transaction ID
export const updateTransaction: handleUnaryCall<
	core.TransactionUpdate,
	core.Status
> = (request, respond) => {
	// Extract transaction details from the request
	const { transaction_id, sender, receiver, amount } = request.request;

	// Find the transaction in the ledger
	const transaction = ledger.find(
		(tx) => tx.transaction_id === transaction_id,
	);

	if (!transaction) {
		// Transaction not found; respond with failure status
		return respond(
			null,
			new core.Status({
				succeeded: false,
			}),
		);
	}

	// Update transaction details
	if (sender != undefined) {
		transaction.sender = sender;
	}
	if (receiver != undefined) {
		transaction.receiver = receiver;
	}
	if (amount != undefined) {
		transaction.amount = amount;
	}

	// Respond with success status
	respond(
		null,
		new core.Status({
			succeeded: true,
		}),
	);
};
