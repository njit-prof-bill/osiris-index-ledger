import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Define the ledger as an exportable object for access in tests
// TODO: Remove once DB, maybe Redis, is implemented
export const ledger: core.Transaction[] = [];

// TODO: Create TypeScript documentation using JSDoc tags
export const calculateTotalLedgerValue: handleUnaryCall<
	core.Null,
	core.CurrencyValue
> = (request, respond) => {
	// Calculate the total value by summing up the amount in each transaction from the shared ledger
	const totalValue = ledger.reduce(
		(sum, transaction) => sum + transaction.amount,
		0,
	);

	respond(
		null,
		new core.CurrencyValue({
			value: totalValue,
		}),
	);
};
