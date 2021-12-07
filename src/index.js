#!/usr/bin/env node

import { getInputArgs } from "./util/getInputArgs.js";
import { extract } from "./extract.js";

const { key, path } = getInputArgs();

const recipe = extract(path);

if (key) {
    let value = recipe[key];
    if (value instanceof Array) value = value.join(", ");

    console.info(value);
} else {
    console.info(JSON.stringify(recipe));
}
