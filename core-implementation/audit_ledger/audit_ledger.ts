import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// NOTE: Temporary data for testing ONLY
export const ledger: core.Transaction[] = [];

export const auditLedger: handleUnaryCall<core.Null, core.AuditReport> = (
	request,
	respond,
) => {
	let discrepancies_total = 0;
	const issues: core.Issue[] = [];
	const unq_transaction_ids = new Set<string>();

	// Goes through each transaction from the ledger
	ledger.forEach((transaction) => {
		/*
        NOTE: Issue will be {} placeholders for now, this 
        is due to Issue having a empty message in core.proto file.
        Until it is updated, I'll be able to work on it again.
        I also believe this API can be improved once we have the
        DB
        */
		// Checks if theres a duplicate transaction id
		if (unq_transaction_ids.has(transaction.transaction_id)) {
			discrepancies_total += 1;
			issues.push(new core.Issue());
		} else {
			/* if not, then will be added to unq_transaction_ids 
            so that the next iter of this id will be detected
            */
			unq_transaction_ids.add(transaction.transaction_id);
		}

		// Checks if the amount is invalid (negative numbers)
		if (transaction.amount < 0) {
			discrepancies_total += 1;
			issues.push(new core.Issue());
		}

		// Checks if sender is empty
		if (!transaction.sender) {
			discrepancies_total += 1;
			issues.push(new core.Issue());
		}

		// Checks if receiver is empty
		if (!transaction.receiver) {
			discrepancies_total += 1;
			issues.push(new core.Issue());
		}

		// Checks if timestamp is empty
		if (!transaction.timestamp) {
			discrepancies_total += 1;
			issues.push(new core.Issue());
		}
	});

	// Creates audit report with number of discrepancies and issues
	const AuditReport = new core.AuditReport({
		discrepancies_found: discrepancies_total.toString(),
		issues,
	});

	// Sends the response back
	respond(null, AuditReport);
};
