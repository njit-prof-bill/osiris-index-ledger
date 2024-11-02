import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

export const GetTransactionDetails: handleUnaryCall<
	core.TransactionId,
	core.Transaction
> = (request, respond) => {
	// TODO: retrieve transaction details
	respond(
		null,
		new core.Transaction({
			transaction_id: "123",
			sender: "me",
			receiver: "you",
			amount: 500,
			timestamp: "2024-10-20T12:00:00Z",
		}),
	);
};
