import { Dependency, toWorkspaceAddOptions, workspaceAdd } from "bolt";

export enum configDependencyType {
  DEPENDENCIES = "dependencies",
  DEV_DEPENDENCIES = "devDependencies",
  PEER_DEPENDENCIES = "peerDependencies",
  OPTIONAL_DEPENDENCIES = "optionalDependencies"
}

/**
 * Copypasta from https://github.com/boltpkg/bolt/blob/master/src/utils/options.js
 *
 * Takes a string in one of the following forms:
 *  "pkgName", "pkgName@version", "@scope/pkgName", "@scope/pkgName@version"
 * and returns an object with the package name and version (if passed)
 */
export function toDependency(dependencyString: string): Dependency {
  let [name, version] = dependencyString.split("@").filter(part => part !== "");
  if (name.includes("/")) {
    name = "@" + name;
  }
  return version ? { name, version } : { name };
}
