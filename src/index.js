#!/usr/bin/env node

import meow from "meow";
import { getInput } from "./util/getInput.js";
import { extract } from "./extract.js";

const cli = meow(`
    Usage
      $ extract-docker-baseimg-recipe [Options] <Dockerfile path> [key]

    Options
      --apply-variant, --no-apply-variant, -a   Toggle whether to apply variant to tags or not. Type: boolean. Default: true

      --help                                    Print help menu

      --version                                 Print the version of this program
`, {
    importMeta: import.meta,
    flags: {
        applyVariant: {
            type: "boolean",
            alias: "a",
            default: true
        }
    }
});

const { path, key, flags } = getInput(cli.input, cli.flags);

if (path) {
    const recipe = extract(path, { applyVariant: flags.applyVariant });

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
