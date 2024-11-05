import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

export const recordTransaction: handleUnaryCall<
	core.Transaction,
	core.Status
> = (request, respond) => {
	// TODO: put the transaction in some kind of database
	respond(
		null,
		new core.Status({
			succeeded: true,
		}),
	);
};
