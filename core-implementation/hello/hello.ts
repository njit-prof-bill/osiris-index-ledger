import { helloworld } from "../../generated/hello.js";
import { GRPCFunc } from "../../proto.js";

export const hello: GRPCFunc<helloworld.HelloRequest, helloworld.HelloReply> = (
	request,
	respond,
) => {
	const message = `hello, ${request.request.name}!!!`;
	console.log(message);
	respond(
		null,
		new helloworld.HelloReply({
			message,
		}),
	);
};
