import { handleUnaryCall } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";


export const syncLedger: handleUnaryCall<
        sync.Null,
        sync.Status
     > = (request,respond) => {
        respond(
                null,   
                new sync.Status({
                    succeeded: true
                }),
        );
};