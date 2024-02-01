import { readFile } from "node:fs/promises";
import { EOL } from "node:os";
import { resolve } from "node:path";

/**
 * @typedef {object} Dockerfile
 * @property {string} file - The Dockerfile content
 * @property {Array.<string>} lines The Dockerfile content, splitted by lines into an Array
 */

/**
 * Get the Dockerfile content
 *
 * @private
 * @param {string} path The path for the Dockerfile
 * @returns {Promise<Dockerfile>} Dockerfile content
 */
export async function getDockerfile(path) {
    const Dockerfile = await readFile(resolve(path))
        .then(data => data.toString());
    const lines = Dockerfile.split(EOL);

    return { file: Dockerfile, lines };
}
