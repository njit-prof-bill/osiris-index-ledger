import grpc from "@grpc/grpc-js";
import { sync } from "../../generated/sync/sync.js";
import { server, serverUp, target } from "../../main.js";
let client;
beforeAll(async () => {
    await serverUp;
    client = new sync.IndexSynchroClient(target, grpc.credentials.createInsecure());
});
afterAll(() => {
    server.forceShutdown();
});
test("fetch missing transactions", (done) => {
    client.FetchMissingTransactions(new sync.Null({}), function (err, response) {
        done();
        expect(response?.transaction_list);
        if (response) {
            const transaction_list = response.transaction_list;
            transaction_list.forEach(element => {
                expect(element).toBeInstanceOf(sync.TransactionId);
            });
            expect(transaction_list).toEqual([
                expect.objectContaining({
                    "transaction_id": "txn-126",
                }),
                expect.objectContaining({
                    "transaction_id": "txn-127",
                }),
                expect.objectContaining({
                    "transaction_id": "txn-128",
                })
            ]);
        }
    });
});
