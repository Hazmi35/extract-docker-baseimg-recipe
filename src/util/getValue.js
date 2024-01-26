/**
 * Get the value of "key: value" strings
 *
 * @private
 * @param {string} string The "key: value" string
 * @returns {string} The value of "key: value" string
 */
export function getValue(string) {
    return (/[^:]+$/u).exec(string)?.at(0).trim();
}
