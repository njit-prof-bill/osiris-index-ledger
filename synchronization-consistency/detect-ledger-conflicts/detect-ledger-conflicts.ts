import { handleUnaryCall } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

// Populated with conflict data
const syncConflict: sync.Conflict[] = [
    new sync.Conflict({ transaction_id: "txn-123", conflicting_transaction: "txn-999", reason: "duplicate transaction" }),
    new sync.Conflict({ transaction_id: "txn-124", conflicting_transaction: "txn-1000", reason: "mismatched amounts" })
];

export const detect_ledger_conflicts: handleUnaryCall<
	null,
	sync.ConflictList
> = (request, respond) => {
    // Responds with the conflict data
    respond(
        null,
        new sync.ConflictList({
            conflict_list: syncConflict
        })
    );
}

