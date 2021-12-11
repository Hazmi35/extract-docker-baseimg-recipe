import core from "@actions/core";
import { extract } from "./extract.js";

try {
    const path = core.getInput("path");
    const applyVariant = core.getBooleanInput("applyVariant") ?? true;
    const seperator = core.getInput("seperator") ?? ", ";
    const reverseTags = core.getInput("reverseTags") ?? false;

    if (path) {
        const recipe = extract(path, { applyVariant, reverseTags });

        core.setOutput("tags", recipe.tags.join(seperator));
        core.setOutput("variant", recipe.variant);
        core.setOutput("platforms", recipe.platforms.join(seperator));
        core.setOutput("version", recipe.version);
    } else {
        throw new Error("Path option is required");
    }
} catch (error) {
    core.setFailed(error.message);
}
