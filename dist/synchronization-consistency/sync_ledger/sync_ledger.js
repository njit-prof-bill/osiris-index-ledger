import { sync } from "../../generated/sync/sync.js";
export const syncLedger = (request, respond) => {
    respond(null, new sync.Status({
        succeeded: true
    }));
};
