// A function that seperate a semver. For example: 14.18.1 -> ['14', '14.18', '14.18.1']
export function seperateSemver(version) {
    const versions = [];
    let i = 0;
    const semver = version.split(".");
    while (i !== semver.length) {
        versions.push(semver.slice(0, i + 1).join("."));
        i++;
    }
    return versions;
}
