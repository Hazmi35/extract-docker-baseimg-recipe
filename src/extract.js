import { getDockerfile } from "./util/getDockerfile.js";
import { getRecipe } from "./util/getRecipe.js";
import { seperateSemver } from "./util/seperateSemver.js";
import { applyVariant } from "./util/applyVariant.js";

export function extract(path) {
    const { lines } = getDockerfile(path);
    const { variant, tags: originalTags, version, platforms } = getRecipe(lines);

    const versions = seperateSemver(version);
    const tags = [
        ...versions.map(v => applyVariant(v, variant)).reverse(),
        ...originalTags.map(t => applyVariant(t, variant))
    ].reverse();

    return { tags, variant, platforms, version };
}
