import { sync } from "../../generated/sync/sync.js";
//Define a local and global ledger, local ledger will be compared to global ledger during forced reconciliation
const global_ledger = [
    new sync.TransactionId({ transaction_id: "txn-125" }),
    new sync.TransactionId({ transaction_id: "txn-126" }),
    new sync.TransactionId({ transaction_id: "txn-127" }),
];
const local_ledger = [
    new sync.TransactionId({ transaction_id: "txn-125" }),
    new sync.TransactionId({ transaction_id: "txn-126" }),
    new sync.TransactionId({ transaction_id: "txn-127" }),
];
export const ForceLedgerReconciliation = (call, callback) => {
    try {
        // Create sets of transaction IDs for easier comparison
        const globalSet = new Set(global_ledger.map(tx => tx.transaction_id));
        const localSet = new Set(local_ledger.map(tx => tx.transaction_id));
        // Find missing transactions in the local ledger
        const missingInLocal = [...globalSet].filter(id => !localSet.has(id));
        // Add missing transactions from gloabl to local ledger
        if (missingInLocal.length > 0) {
            missingInLocal.forEach(id => {
                const transaction = global_ledger.find(tx => tx.transaction_id === id);
                if (transaction)
                    local_ledger.push(transaction);
            });
        }
        // Find extra transactions in the local ledger that are not in the global ledger
        const extraInLocal = [...localSet].filter(id => !globalSet.has(id));
        // Remove extra transactions from the local ledger
        if (extraInLocal.length > 0) {
            extraInLocal.forEach(id => {
                const index = local_ledger.findIndex(tx => tx.transaction_id === id);
                if (index !== -1)
                    local_ledger.splice(index, 1);
            });
        }
        // Prepare and send response
        const status = new sync.Status;
        status.succeeded = true;
        callback(null, status);
    }
    catch (error) {
        // Handle errors
        const status = new sync.Status;
        status.succeeded = false;
        callback(null, status);
    }
};
// old basic code
/*
// Reconciliation process occurs here
// Since this is a hardcoded test, assume reconciliation process always works
const reconciliation_success = true; // this is where I would replace it with a function call, which would return sync.status() to tell us if the reconciliation worked

// Return status of reconciliation
return reconciliation_success;
*/ 
