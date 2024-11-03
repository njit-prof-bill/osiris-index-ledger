import { sync } from "../../generated/sync/sync.js";
export const monitorLedgerSyncStatus = (request, respond) => {
    const currStatus = new sync.SyncStatus({ status: "syncing", progress: 85, errors: [] });
    respond(null, currStatus);
};
