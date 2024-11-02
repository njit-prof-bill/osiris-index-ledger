import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// NOTE: Temporary data for testing ONLY
export const ledger: core.Transaction[] = [];

export const deleteTransaction: handleUnaryCall<
	core.TransactionId,
	core.Status
> = (request, respond) => {
	// Extract transaction id
	const transaction_id = request.request.transaction_id;

	// Gets the position of the transaction id match
	const index = ledger.findIndex(
		(transaction) => transaction.transaction_id === transaction_id,
	);

	// Checks if the transactions exist
	if (index !== -1) {
		// If it exists, it will delete transaction
		ledger.splice(index, 1);
		// Returns a successful response
		respond(null, new core.Status({ succeeded: true }));
	} else {
		// Returns a failure response
		respond(null, new core.Status({ succeeded: false }));
	}
};
