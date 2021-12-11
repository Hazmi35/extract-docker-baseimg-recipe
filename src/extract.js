import { getDockerfile } from "./util/getDockerfile.js";
import { getRecipe } from "./util/getRecipe.js";
import { seperateSemver } from "./util/seperateSemver.js";
import { applyVariant } from "./util/applyVariant.js";

export function extract(path, options = { applyVariant: true, reverseTags: false }) {
    const { lines } = getDockerfile(path);
    const { variant, tags: originalTags, version, platforms } = getRecipe(lines);

    const versions = seperateSemver(version);
    const tags = [
        ...versions,
        ...originalTags
    ].map(t => options.applyVariant && variant ? applyVariant(t, variant) : t);

    return { tags: options.reverseTags ? tags.reverse() : tags, variant, platforms, version };
}
