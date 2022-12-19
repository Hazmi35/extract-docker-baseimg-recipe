import { getDockerfile } from "./util/getDockerfile.js";
import { getRecipe } from "./util/getRecipe.js";
import { seperateSemver } from "./util/seperateSemver.js";
import { applyVariant } from "./util/applyVariant.js";

/**
 * @typedef {Object} ImageRecipe
 * @property {Array.<string>} tags - ImageRecipe image tags
 * @property {string} variant ImageRecipe variant
 * @property {Array.<string>} platforms ImageRecipe target platforms
 * @property {string} version ImageRecipe image version
 */

/**
 * Extract recipe from Dockerfile in specified path.
 * @param {String} path Path to Dockerfile. Path can be relative, it will starts from cwd
 * @param {{ applyVariant: boolean, reverseTags: boolean }} options Options for extractor
 * @returns {ImageRecipe} The parsed Docker image recipe
 */
export function extract(path, options = { applyVariant: true, reverseTags: false }) {
    const { lines } = getDockerfile(path);
    const { variant, tags: originalTags, version, platforms } = getRecipe(lines);

    const versions = seperateSemver(version);
    const tags = [
        ...versions,
        ...originalTags
    ].map(t => (options.applyVariant && variant ? applyVariant(t, variant) : t));

    return { tags: options.reverseTags ? tags.reverse() : tags, variant, platforms, version };
}
