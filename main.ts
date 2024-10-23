import grpc from "@grpc/grpc-js";
import core from "./core-implementation/core.js";

export const target = "0.0.0.0:50051";
export const server = new grpc.Server();
core(server);
server.bindAsync(
	target,
	grpc.ServerCredentials.createInsecure(),
	(err, port) => {
		if (err != null) {
			return console.error(err);
		}
		console.log(`grpc listening on port ${port}`);
	},
);
