import { connectivityState, handleUnaryCall } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

const node_list: sync.TransactionIdList[] = [
	new sync.TransactionIdList({
		transaction_list: [
			new sync.TransactionId({ transaction_id: "txn-125" }),
			new sync.TransactionId({ transaction_id: "txn-126" }),
			new sync.TransactionId({ transaction_id: "txn-127" }),
		],
	}),
];

export const BroadcastTransaction: handleUnaryCall<
	sync.TransactionId,
	sync.Status
> = (request, response) => {
	try {
		const get_transaction = request.request.transaction_id; // actual string
		const new_transaction = new sync.TransactionId({
			transaction_id: get_transaction,
		}); // converting actual string into TransactionId object

		node_list.forEach((node) => {
			node.transaction_list.push(new_transaction);
		});

		// Prepare and send the response
		const status = new sync.Status();
		status.succeeded = true;
		response(null, status);
	} catch (Error) {
		// Prepare and send the response
		const status = new sync.Status();
		status.succeeded = false;
		response(null, status);
	}
};
// ---old code---
/*
	// call broadcastToNodes, passes transaction id
	const isSuccess = broadcastToNodes(transactionId);

	// Create and send out response message
	const response = new sync.Status();
	response.succeeded = isSuccess;
	res(null, response);
	*/

/*
export function broadcastToNodes(transactionId: string): boolean {
	try {
		console.log("Broadcasting transaction ${transactionId} to all nodes...");
		// Implement broadcasting logic to all nodes (eg. looping through nodes, sending transactions, awaiting confirmation, etc.)
		// Assume success for now
		return true;
	}
	catch(error) {
		console.error("Failed to broadcast ${transactionId} to all nodes", error);
		return false;
	}
};
*/
