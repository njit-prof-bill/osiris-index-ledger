import { handleUnaryCall } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";
import { syncLedger } from "../sync_ledger/sync_ledger.js";
import { loadSync } from "@grpc/proto-loader";
import { globSync } from "glob";


let node1: sync.TransactionId[] = [new sync.TransactionId({transaction_id : "txn-126"}),new sync.TransactionId({transaction_id : "txn-127"}),new sync.TransactionId({transaction_id : "txn-128"})]
let node2: sync.TransactionId[] = [new sync.TransactionId({transaction_id : "txn-128"}),new sync.TransactionId({transaction_id : "txn-129"}),new sync.TransactionId({transaction_id : "txn-130"})]


export const fetchMissingTransactions: handleUnaryCall<
            sync.Null,
            sync.TransactionIdList
        > = (request,respond) => {

            let localNode: sync.TransactionId[] = [new sync.TransactionId({transaction_id : "txn-128"}),new sync.TransactionId({transaction_id : "txn-129"}),new sync.TransactionId({transaction_id : "txn-130"})]
            let missing_transactions: sync.TransactionId[] = [];
            node1.forEach(element => {
                if(!localNode.includes(element)){
                    missing_transactions.push(element);
                    localNode.push(element);
                }       
            });
            respond(
                    null,
                    new sync.TransactionIdList({transaction_list: missing_transactions}),
            );
};