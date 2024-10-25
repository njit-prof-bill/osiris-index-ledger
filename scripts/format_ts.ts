import { glob } from "glob";
import { exec } from "child_process";

const protoFiles = (await glob("./**/*.ts", { absolute: true })).join(" ");
exec(`npx prettier -w ${protoFiles}`);
