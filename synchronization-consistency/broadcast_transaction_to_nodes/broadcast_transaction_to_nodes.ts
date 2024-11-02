import { handleUnaryCall, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

export const BroadcastTransaction: handleUnaryCall<sync.TransactionId, sync.Status> = (
	req: ServerUnaryCall<sync.TransactionId, sync.Status>,
	res: sendUnaryData<sync.Status>
) => {
	const transactionId = req.request.transaction_id;

	// call broadcastToNodes, passes transaction id
	const isSuccess = broadcastToNodes(transactionId);

	// Create and send out response message
	const response = new sync.Status();
	response.succeeded = isSuccess;
	res(null, response);
};

/**
 * This function takes the transactionId and attempts to broadcast it to all nodes (true if succesfull, false if not)
 * 
 * @param transactionId 
 * @returns true (broadcast successful) or false (broadcast not successful)
 */
function broadcastToNodes(transactionId: string): boolean {
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

