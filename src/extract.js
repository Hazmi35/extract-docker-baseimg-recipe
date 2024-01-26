import { applyVariant } from "./util/applyVariant.js";
import { getDockerfile } from "./util/getDockerfile.js";
import { getRecipe } from "./util/getRecipe.js";
import { seperateSemver } from "./util/seperateSemver.js";

/**
 * @typedef {object} ImageRecipe
 * @property {Array.<string>} tags - ImageRecipe image tags
 * @property {string} variant ImageRecipe variant
 * @property {Array.<string>} platforms ImageRecipe target platforms
 * @property {string} version ImageRecipe image version
 */

/**
 * Extract recipe from Dockerfile in specified path.
 *
 * @param {string} path Path to Dockerfile. Path can be relative, it will starts from cwd
 * @param {{ applyVariant: boolean, reverseTags: boolean }} options Options for extractor
 * @returns {Promise<ImageRecipe>} The parsed Docker image recipe
 */
export async function extract(path, options) {
    const opt = {
        applyVariant: true,
        reverseTags: false,
        ...options
    };
    const { lines } = await getDockerfile(path);
    const { variant, tags: originalTags, version, platforms } = getRecipe(lines);

    const versions = seperateSemver(version);
    const tags = [
        ...versions,
        ...originalTags
    ].map(tg => (opt.applyVariant && variant ? applyVariant(tg, variant) : tg));

    return { tags: opt.reverseTags ? tags.reverse() : tags, variant, platforms, version };
}
