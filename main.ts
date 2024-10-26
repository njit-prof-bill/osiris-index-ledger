import grpc from "@grpc/grpc-js";
import core from "./core-implementation/core.js";

export let target = "0.0.0.0:50051";
export const server = new grpc.Server();
core(server);

async function retryBind(): Promise<void> {
	return bind().catch((err: Error) => {
		if (err.message.includes("address already in use")) {
			// TODO: turn off this functionality in prod
			const oldTarget = target;
			target = "0.0.0.0:" + Math.floor(Math.random() * 20000 + 10000);
			console.log(
				`failed to bind to ${oldTarget}\nAttempting to bind to ${target}`,
			);
			return retryBind();
		} else {
			return Promise.reject(err);
		}
	});
}

async function bind() {
	return new Promise<void>((resolve, reject) => {
		server.bindAsync(
			target,
			grpc.ServerCredentials.createInsecure(),
			(err, port) => {
				if (err != null) {
					reject(err);
				} else {
					console.log(`grpc listening on port ${port}`);
					resolve();
				}
			},
		);
	});
}

export const serverUp = retryBind();
