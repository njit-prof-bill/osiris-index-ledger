import { ForceLedgerReconciliation } from './force_ledger_reconciliation.js';
describe('forceLedgerReconciliation', () => {
    it('should return true when reconciliation is successful', () => {
        const result = ForceLedgerReconciliation();
        expect(result).toBe(true);
    });
});
