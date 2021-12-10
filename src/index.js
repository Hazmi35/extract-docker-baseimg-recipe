#!/usr/bin/env node

import meow from "meow";
import { getInputArgs } from "./util/getInputArgs.js";
import { extract } from "./extract.js";

const cli = meow(`
    Usage
      $ extract-docker-baseimg-recipe [Options] <Dockerfile path> [key]

    Options
      --apply-variant, --no-apply-variant, -a	Toggle to apply variant to tags. Default: true

      --help    Show help menu
`, {
    importMeta: import.meta
});

const { path, key } = getInputArgs(cli.input);

if (path) {
    const recipe = extract(path);

    if (key) {
        let value = recipe[key];
        if (value instanceof Array) value = value.join(", ");

        console.info(value);
    } else {
        console.info(JSON.stringify(recipe));
    }
} else {
    cli.showHelp(1);
}
