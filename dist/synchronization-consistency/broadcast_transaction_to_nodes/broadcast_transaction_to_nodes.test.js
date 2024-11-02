import { BroadcastTransaction, broadcastToNodes } from './broadcast_transaction_to_nodes.js'; // Adjust the path
import { sync } from '../../generated/sync/sync.js';
jest.mock('./broadcast_transaction_to_nodes.js', () => {
    const actual = jest.requireActual('./broadcast_transaction_to_nodes.js'); // Use import here
    return {
        ...actual,
        broadcastToNodes: jest.fn(),
    };
});
describe('BroadcastTransaction', () => {
    let mockReq;
    let mockRes;
    beforeEach(() => {
        // Create a valid TransactionId instance
        mockReq = {
            request: new sync.TransactionId({ transaction_id: '1234' }), // Create a valid instance
        };
        mockRes = jest.fn();
    });
    it('should return true when broadcast is successful', () => {
        broadcastToNodes.mockReturnValue(true);
        const response = new sync.Status();
        response.succeeded = true;
        BroadcastTransaction(mockReq, mockRes);
        expect(broadcastToNodes).toHaveBeenCalledWith('1234');
        expect(mockRes).toHaveBeenCalledWith(null, response);
    });
    it('should return false when broadcast fails', () => {
        broadcastToNodes.mockReturnValue(false);
        const response = new sync.Status();
        response.succeeded = false;
        BroadcastTransaction(mockReq, mockRes);
        expect(broadcastToNodes).toHaveBeenCalledWith('1234');
        expect(mockRes).toHaveBeenCalledWith(null, response);
    });
});
