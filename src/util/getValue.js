export function getValue(string) {
    return (/[^:]+$/).exec(string)?.at(0).trim();
}
