/**
 * Apply a variant to a string with "$STRING-$VARIANT" format
 *
 * @private
 * @param {string} string The string to apply the variant to
 * @param {string} variant The variant to apply
 * @returns {string} The modified string
 */
export function applyVariant(string, variant) {
    return `${string}-${variant}`;
}
