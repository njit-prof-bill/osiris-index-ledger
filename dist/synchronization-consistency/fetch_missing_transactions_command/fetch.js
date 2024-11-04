import { sync } from "../../generated/sync/sync.js";
let node1 = [new sync.TransactionId({ transaction_id: "txn-126" }), new sync.TransactionId({ transaction_id: "txn-127" }), new sync.TransactionId({ transaction_id: "txn-128" })];
let node2 = [new sync.TransactionId({ transaction_id: "txn-128" }), new sync.TransactionId({ transaction_id: "txn-129" }), new sync.TransactionId({ transaction_id: "txn-130" })];
export const fetchMissingTransactions = (request, respond) => {
    let localNode = [new sync.TransactionId({ transaction_id: "txn-128" }), new sync.TransactionId({ transaction_id: "txn-129" }), new sync.TransactionId({ transaction_id: "txn-130" })];
    let missing_transactions = [];
    node1.forEach(element => {
        if (!localNode.includes(element)) {
            missing_transactions.push(element);
            localNode.push(element);
        }
    });
    respond(null, new sync.TransactionIdList({ transaction_list: missing_transactions }));
};
