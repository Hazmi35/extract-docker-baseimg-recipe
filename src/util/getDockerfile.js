import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EOL } from "node:os";

export function getDockerfile(path) {
    const Dockerfile = readFileSync(resolve(path)).toString();
    const lines = Dockerfile.split(EOL);

    return { file: Dockerfile, lines };
}
