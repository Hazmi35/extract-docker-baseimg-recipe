import { getValue } from "./getValue.js";

/**
 * @typedef {Recipe} Docker image recipe
 * @property {Array.<string>} tags - The Docker image tags
 * @property {string} variant The Docker image variant
 * @property {Array.<string>} platforms The Docker imge target platforms
 * @property {string} version The Docker image version
 */

/**
 * Get the Dockerfile content
 * @private
 * @param {Array.<string>} lines Dockerfile lines
 * @returns {Recipe} Docker image recipe
 */
export function getRecipe(lines) {
    return {
        tags: getValue(lines.at(0)).split(", "),
        variant: getValue(lines.at(1)),
        platforms: getValue(lines.at(2)).split(", "),
        version: getValue(lines.at(3)).split("-").at(0)
    };
}
