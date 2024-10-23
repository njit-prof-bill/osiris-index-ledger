import { core } from "../../generated/core/core.js";
import { GRPCFunc } from "../../proto.js";

export const recordTransaction: GRPCFunc<core.Transaction, core.Status> = (
	request,
	respond,
) => {
	// todo: put the transaction in some kind of database
	respond(
		null,
		new core.Status({
			succeeded: true,
		}),
	);
};
