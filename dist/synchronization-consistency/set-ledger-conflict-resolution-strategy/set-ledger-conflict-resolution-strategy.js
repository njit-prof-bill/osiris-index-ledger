import { sync } from "../../generated/sync/sync.js";
export const setLedgerConflictResolutionStrategy = (request, respond) => {
    let newStrat = request.request.strategy;
    if (newStrat == "latest" || newStrat == "merge" || newStrat == "manual") {
        respond(null, new sync.Status({ succeeded: true }));
    }
    else {
        respond(null, new sync.Status({ succeeded: false }));
    }
};
