import { rimraf } from "rimraf";
import { glob } from "glob";
import { exec } from "child_process";
import { resolve } from "path";
import { mkdirSync } from "fs";
rimraf("./dist");
mkdirSync("./generated");
const protoFiles = (await glob("./proto/**/*.proto", { absolute: true }))
    .map((path) => `\"${path}\"`)
    .join(" ");
const protoPath = resolve("./proto");
if (process.platform == "win32") {
    exec(`npx grpc_tools_node_protoc --proto_path=\"${protoPath}\" --plugin=".\\node_modules\\.bin\\protoc-gen-ts" --ts_out=./generated ${protoFiles}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return;
        }
        if (stderr) {
            console.error(stderr);
        }
        console.log(stdout);
    });
}
else {
    exec(`npx grpc_tools_node_protoc --proto_path=\"${protoPath}\" --plugin=./node_modules/.bin/protoc-gen-ts --ts_out=./generated ${protoFiles}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return;
        }
        if (stderr) {
            console.error(stderr);
        }
        console.log(stdout);
    });
}
