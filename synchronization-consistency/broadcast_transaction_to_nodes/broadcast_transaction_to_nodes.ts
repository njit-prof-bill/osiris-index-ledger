import { handleUnaryCall, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";

export const BroadcastTransaction: handleUnaryCall<sync.TransactionId, sync.Status> = (
	req: ServerUnaryCall<sync.TransactionId, sync.Status>,
	res: sendUnaryData<sync.Status>
) => {
	const transactionId = req.request.transaction_id;

	const isSuccess = broadcastToNodes(transactionId);

	// Creates response message
	const response: sync.Status = { succeeded: isSuccess };

	res(null, response);
};

function broadcastToNodes(transactionId: string): boolean {
	try {
		console.log("Broadcasting transaction ${transactionId} to all nodes...");
		// Assume success
		return true;
	}
	catch(error) {
		console.error("Failed to broadcast ${transactionId} to all nodes", error);
		return false;
	}
};

