#!/usr/bin/env node

import meow from "meow";
import { getInput } from "./util/getInput.js";
import { extract } from "./extract.js";

const cli = meow(`
    Usage
      $ extract-docker-baseimg-recipe [Options] <Dockerfile path> [key]

    Options
      --apply-variant, --no-apply-variant, -a   Toggle whether to apply variant to tags or not. Type: boolean. Default: true

      --seperator, -s                           What seperator to use for Array if [key] query is used. use "\\n" for newline. Type: string. Default: ", "

      --reverse-tags, --no-reverse-tags, -r     Reverse the tags array. Type: boolean. Default: false

      --help                                    Print help menu

      --version                                 Print the version of this program
`, {
    importMeta: import.meta,
    flags: {
        applyVariant: {
            type: "boolean",
            alias: "a",
            default: true
        },
        seperator: {
            type: "string",
            alias: "s",
            default: ", "
        },
        reverseTags: {
            type: "boolean",
            alias: "r",
            default: false
        }
    }
});

const { path, key, flags } = getInput(cli.input, cli.flags);

if (path) {
    const recipe = extract(path, { applyVariant: flags.applyVariant, reverseTags: flags.reverseTags });

    if (key) {
        let value = recipe[key];
        if (value instanceof Array) value = value.join(flags.seperator === "\\n" ? "\n" : flags.seperator);

        console.info(value);
    } else {
        console.info(JSON.stringify(recipe));
    }
} else {
    cli.showHelp(1);
}
