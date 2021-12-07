import { resolve } from "node:path";
import { cwd, argv } from "node:process";

export function getInputArgs() {
    return { path: resolve(cwd(), argv.at(2)), key: argv.at(3) };
}
