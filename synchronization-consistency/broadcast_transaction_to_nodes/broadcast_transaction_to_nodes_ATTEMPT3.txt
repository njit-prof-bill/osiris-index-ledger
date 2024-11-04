import { BroadcastTransaction, broadcastToNodes } from './broadcast_transaction_to_nodes.js'; // Adjust the path
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { sync } from '../../generated/sync/sync.js';

jest.mock('./broadcast_transaction_to_nodes.js', () => {
    const actual = jest.requireActual('./broadcast_transaction_to_nodes.js'); // Use import here
    return {
        ...actual,
        broadcastToNodes: jest.fn(),
    };
});

describe('BroadcastTransaction', () => {
    let mockReq: Partial<ServerUnaryCall<sync.TransactionId, sync.Status>>;
    let mockRes: jest.Mocked<sendUnaryData<sync.Status>>;

    beforeEach(() => {
        // Create a valid TransactionId instance
        mockReq = {
            request: new sync.TransactionId({ transaction_id: '1234' }), // Create a valid instance
        };
        mockRes = jest.fn();
    });

    it('should return true when broadcast is successful', () => {
        (broadcastToNodes as jest.Mock).mockReturnValue(true);
        
        const response = new sync.Status();
        response.succeeded = true;

        BroadcastTransaction(mockReq as ServerUnaryCall<sync.TransactionId, sync.Status>, mockRes as sendUnaryData<sync.Status>);

        expect(broadcastToNodes).toHaveBeenCalledWith('1234');
        expect(mockRes).toHaveBeenCalledWith(null, response);
    });

    it('should return false when broadcast fails', () => {
        (broadcastToNodes as jest.Mock).mockReturnValue(false);
        
        const response = new sync.Status();
        response.succeeded = false;

        BroadcastTransaction(mockReq as ServerUnaryCall<sync.TransactionId, sync.Status>, mockRes as sendUnaryData<sync.Status>);

        expect(broadcastToNodes).toHaveBeenCalledWith('1234');
        expect(mockRes).toHaveBeenCalledWith(null, response);
    });
});