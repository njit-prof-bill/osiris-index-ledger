import { sync } from "../../generated/sync/sync.js";
// Populated with conflict data
const syncConflict = [
    new sync.Conflict({ transaction_id: "txn-123", conflicting_transaction: "txn-999", reason: "duplicate transaction" }),
    new sync.Conflict({ transaction_id: "txn-124", conflicting_transaction: "txn-1000", reason: "mismatched amounts" })
];
export const detectLedgerConflicts = (request, respond) => {
    // Responds with the conflict data
    respond(null, new sync.ConflictList({
        conflict_list: syncConflict
    }));
};
