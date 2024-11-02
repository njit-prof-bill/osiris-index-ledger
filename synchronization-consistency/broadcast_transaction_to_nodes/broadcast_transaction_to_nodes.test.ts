import { handleUnaryCall, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";
import { BroadcastTransaction } from './broadcast_transaction_to_nodes.js';

jest.mock('./broadcast_transaction_to_nodes.js', () => ({
    ...jest.requireActual('./broadcast_transaction_to_nodes.js'),
    broadcastToNodes: jest.fn(),
  }));

const { broadcastToNodes } = require('./broadcast_transaction_to_nodes.js');

function mockGrpcCall(transactionId: string, res: sendUnaryData<sync.Status>) {
    const req = { request: { transaction_id: transactionId } } as ServerUnaryCall<sync.TransactionId, sync.Status>;
    BroadcastTransaction(req, res);
  }

describe("BroadCastTransaction", () => {
    it("should return true for a successful broadcast", (done) => {
        broadcastToNodes.mockReturnValue(true);

        mockGrpcCall("txn-125", (error, response) => {
            expect(error).toBeNull();
            expect(response?.succeeded).toBe(true);
            done();
        });
    });

    it("should return false for a failed broadcast", (done) => {
        broadcastToNodes.mockReturnValue(false);

        mockGrpcCall("txn-126", (error, response) => {
            expect(error).toBeNull();
            expect(response?.succeeded).toBe(false);
            done();
        });
    });
});