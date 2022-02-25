/**
 * @typedef {Object} Input
 * @property {string} path - The Dockerfile path
 * @property {string} key CLI key
 * @property {any} flags CLI flags from meow
 */

/**
 * Get the Dockerfile content
 * @private
 * @param {string} input Raw input from CLI
 * @param {string} flags Raw flags input from CLI
 * @returns {Input} CLI parsed input
 */
export function getInput(input, flags) {
    return { path: input.at(0), key: input.at(1), flags };
}
