import { monitorLedgerSyncStatus } from "./monitor-ledger-sync-status/monitor_ledger_sync_status.js";
import { setLedgerConflictResolutionStrategy } from "./set-ledger-conflict-resolution-strategy/set-ledger-conflict-resolution-strategy.js";
import { scheduleLedgerSync } from "./schedule-ledger-sync/schedule-ledger-sync.js";
import { viewLedgerSyncHistory } from "./view-ledger-sync-history/view-ledger-sync-history.js";
import { resolveLedgerConflict } from "./resolve-ledger-conflict/resolve-ledger-conflict.js";
import { detectLedgerConflicts } from "./detect-ledger-conflicts/detect-ledger-conflicts.js";
import { ForceLedgerReconciliation } from "./force_ledger_reconciliation/force_ledger_reconciliation.js";
import { BroadcastTransaction } from "./broadcast_transaction_to_nodes/broadcast_transaction_to_nodes.js";
/* Add APIs here as we complete them. */

export default function addModule(server) {
    addService(server, loadProtoService("proto/sync/sync.proto", "sync", "IndexSynchro"), {
        MonitorLedgerSyncStatus: monitorLedgerSyncStatus,
        SetLedgerConflictResolutionStrategy: setLedgerConflictResolutionStrategy,
        ScheduleLedgerSync: scheduleLedgerSync,
        ViewLedgerSyncHistory: viewLedgerSyncHistory,
        ResolveLedgerConflict: resolveLedgerConflict,
        DetectLedgerConflicts: detectLedgerConflicts,
        BroadcastTransaction: BroadcastTransaction,
        ForceLedgerReconciliation: ForceLedgerReconciliation,
    });
    addService(server, loadProtoService("proto/hello.proto", "helloworld", "Greeter"), { SayHello: hello });
}
