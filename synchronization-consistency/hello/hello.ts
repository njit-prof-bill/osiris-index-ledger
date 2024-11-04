import { handleUnaryCall } from "@grpc/grpc-js";
import { helloworld } from "../../generated/hello.js";

export const hello: handleUnaryCall<
	helloworld.HelloRequest,
	helloworld.HelloReply
> = (request, respond) => {
	const message = `hello, ${request.request.name}!!!`;
	console.log(message);
	respond(
		null,
		new helloworld.HelloReply({
			message,
		}),
	);
};
