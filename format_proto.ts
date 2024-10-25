import { glob } from "glob";
import { exec } from "child_process";

const protoFiles = (await glob("./proto/**/*.proto", { absolute: true })).join(
	" ",
);
exec(`npx clang-format -i ${protoFiles}`);
