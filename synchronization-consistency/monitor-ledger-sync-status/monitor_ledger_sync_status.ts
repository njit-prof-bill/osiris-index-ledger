import { handleUnaryCall } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

export const monitorLedgerSyncStatus: handleUnaryCall<
    sync.Null,
    sync.SyncStatus
> = (request, respond) => {

    const currStatus = new sync.SyncStatus({status:"syncing", progress:85,errors:[]})

    respond(null, currStatus)

}