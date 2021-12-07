#!/usr/bin/env node

import { getInputArgs } from "./util/getInputArgs.js";
import { getDockerfile } from "./util/getDockerfile.js";
import { getRecipe } from "./getRecipe.js";
import { seperateSemver } from "./util/seperateSemver.js";
import { applyVariant } from "./util/applyVariant.js";

const { path, key } = getInputArgs();
const { lines } = getDockerfile(path);
const { variant, tags: originalTags, version, platforms } = getRecipe(lines);

const versions = seperateSemver(version);
const tags = [
    ...versions.map(v => applyVariant(v, variant)).reverse(),
    ...originalTags.map(t => applyVariant(t, variant))
];

const recipe = { tags, variant, platforms, version };

if (key) {
    let value = recipe[key];
    if (value instanceof Array) value = value.join(", ");

    console.info(value);
} else {
    console.info(JSON.stringify(recipe));
}
