import { sync } from "../../generated/sync/sync.js";
// Populated with transaction data
export const ledger = [];
// TODO: Integrate with a real database
export const resolveLedgerConflict = (request, respond) => {
    const { resolution_strategy } = request.request;
    // Check if the resolution_strategy is "latest", "merge", "manual"
    if (resolution_strategy === "latest" || resolution_strategy === "merge" || resolution_strategy === "manual") {
        respond(null, new sync.Status({
            succeeded: true,
        }));
    }
    else {
        respond(null, new sync.Status({
            succeeded: false,
        }));
    }
};
