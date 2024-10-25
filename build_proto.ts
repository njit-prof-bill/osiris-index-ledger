import { rimraf } from "rimraf";
import { glob } from "glob";
import { exec } from "child_process";
import { resolve } from "path";

rimraf("./dist");

const protoFiles = (await glob("./proto/**/*.proto", { absolute: true })).join(
	" ",
);
const protoPath = resolve("./proto");
exec(
	`npx grpc_tools_node_protoc --proto_path=${protoPath} --plugin=./node_modules/.bin/protoc-gen-ts --ts_out=./generated ${protoFiles}`,
);
