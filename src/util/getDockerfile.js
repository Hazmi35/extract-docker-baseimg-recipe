import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EOL } from "node:os";

/**
 * @typedef {Object} Dockerfile
 * @property {string} file - The Dockerfile content
 * @property {Array.<string>} lines The Dockerfile content, splitted by lines into an Array
 */

/**
 * Get the Dockerfile content
 * @private
 * @param {string} path The path for the Dockerfile
 * @returns {Dockerfile} Dockerfile content
 */
export function getDockerfile(path) {
    const Dockerfile = readFileSync(resolve(path)).toString();
    const lines = Dockerfile.split(EOL);

    return { file: Dockerfile, lines };
}
