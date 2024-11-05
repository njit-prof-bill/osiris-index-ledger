import * as grpc from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

/* We will store our schedules in a set. */
const syncSchedules: Set<string> = new Set();

export const scheduleLedgerSync: grpc.handleUnaryCall<
	sync.Interval,
	sync.Status
> = (request, respond) => {
	const validIntervals = ["hourly", "daily", "weekly"];

	/* Check if the provided interval is valid. */
	const { interval } = request.request;
	console.log(interval);

	if (!validIntervals.includes(interval)) {
		console.log("Failed to schedule ledger: invalid argument.");
		respond(
			null,
			new sync.Status({
				succeeded: false,
			}),
		);
	} else {
		/* TODO: Actual logic for scheduling. */
		syncSchedules.add(interval);
		console.log(`Scheduled ledger sync at interval: ${interval}`);
		respond(
			null,
			new sync.Status({
				succeeded: true,
			}),
		);
	}
};
