/**
 * A function that seperate a semver. For example: 14.18.1 -> ['14', '14.18', '14.18.1']
 *
 * @private
 * @param {string} version Semver version
 * @returns {Array.<string>} Seperated semver in Array
 */
export function seperateSemver(version) {
    const semverArray = version.split(".");
    return semverArray.map((_, i) => semverArray.slice(0, semverArray.length - i).join("."));
}
