import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Define the ledger as an exportable object for access in tests
// TODO: Remove once DB, maybe Redis, is implemented
export const ledger: core.Transaction[] = [];

export const verifyTransactionIntegrity: handleUnaryCall<
	core.TransactionId,
	core.Status
> = (request, respond) => {
	// Extract the transaction ID from the request message
	const { transaction_id } = request.request;

	// Check if the transaction exists in the ledger
	const transactionExists = ledger.find(
		(transaction) => transaction.transaction_id === transaction_id,
	);

	if (!transactionExists) {
		return respond(
			null,
			new core.Status({
				succeeded: false,
			}),
		);
	}

	respond(
		null,
		new core.Status({
			succeeded: true,
		}),
	);
};
