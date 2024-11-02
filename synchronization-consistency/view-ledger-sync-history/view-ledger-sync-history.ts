import * as grpc from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

/* We will store our syncEvents in a list. */
const syncEventList: sync.SyncEvent[] = [
    new sync.SyncEvent({"timestamp": "2024-10-19T10:00:00Z", "status": "successful"}),
    new sync.SyncEvent({"timestamp": "2024-10-18T10:00:00Z", "status": "failed"}),
    new sync.SyncEvent({"timestamp": "2024-10-17T10:00:00Z", "status": "successful"})
];

/* Implementation. */
export const viewLedgerSyncHistory: grpc.handleUnaryCall<
	sync.Limit,
	sync.SyncEventList
> = (request, respond) => {
	/* Create a new syncEventList that is restricted by the limit. */
    let limit = request.request.limit > 0 ? request.request.limit : 100;

    /* Loop through all sync events and make sure not to surpass limit. */
    const syncEventListLimit: sync.SyncEvent[] = [];
    for (const syncEvent of syncEventList){
        if (syncEventListLimit.push(syncEvent) >= limit) break;
    }

    /* Send over the completed list. */
    respond(
        null,
        new sync.SyncEventList(syncEventListLimit)
    );
};
