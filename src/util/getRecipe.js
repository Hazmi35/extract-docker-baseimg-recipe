import { getValue } from "./getValue.js";

export function getRecipe(lines) {
    return {
        tags: getValue(lines.at(0)).split(", "),
        variant: getValue(lines.at(1)),
        platforms: getValue(lines.at(2)).split(", "),
        version: getValue(lines.at(3)).split("-").at(0)
    };
}
