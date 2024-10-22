import grpc from "@grpc/grpc-js";
import core from "./core-implementation/core.ts";

function main() {
	const server = new grpc.Server();
	core(server);
	server.bindAsync(
		"0.0.0.0:50051",
		grpc.ServerCredentials.createInsecure(),
		(err, port) => {
			if (err != null) {
				return console.error(err);
			}
			console.log(`grpc listening on port ${port}`);
		},
	);
}

main();
