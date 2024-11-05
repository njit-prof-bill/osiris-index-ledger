import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";
import { ledger } from "../search_transaction_by_user/search_transaction_by_user.js";

// Define handler for getAccountBalance, which takes the user id and returns a CurrencyValue
export const getAccountBalance: handleUnaryCall<
	core.UserId,
	core.CurrencyValue
> = (request, respond) => {
	// Extract the user ID from the incoming request.
	const userID = request.request.user_id;

	// Initializes balance to keep track of changes (sending and receiving)
	let balance: number = 0;

	// Iterates over the ledger and respectively makes changes to balance
	// * If receiever --> Adds to balance
	// * If sender    --> Subtract from balance
	ledger.forEach((transaction) => {
		if (transaction.receiver === userID) {
			balance += transaction.amount;
		} else if (transaction.sender === userID) {
			balance -= transaction.amount;
		}
	});

	// Creates a CurrencyValue instance that takes the computed balance
	const CurrencyValue = new core.CurrencyValue({
		value: balance,
	});

	// Sends response back
	respond(null, CurrencyValue);
};
