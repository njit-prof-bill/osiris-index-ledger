import { helloworld } from "../../generated/hello.js";
export const hello = (request, respond) => {
    const message = `hello, ${request.request.name}!!!`;
    console.log(message);
    respond(null, new helloworld.HelloReply({
        message,
    }));
};
