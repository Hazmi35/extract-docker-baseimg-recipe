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
    ...versions.map(v => applyVariant(v, variant)),
    ...originalTags.map(t => applyVariant(t, variant)).reverse()
];

const recipe = { tags, variant, platforms, version };

if (key) console.info(recipe[key]);
else console.info(recipe);
