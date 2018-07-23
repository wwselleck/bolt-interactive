declare module "bolt" {
  export enum configDependencyType {
    DEPENDENCIES = "dependencies",
    DEV_DEPENDENCIES = "devDependencies",
    PEER_DEPENDENCIES = "peerDependencies",
    OPTIONAL_DEPENDENCIES = "optionalDependencies"
  }

  export interface Workspace {
    dir: string;
    name: string;
  }
  export function getWorkspaces(): Workspace[];
  export function getDependencyGraph(): any;

  export interface Dependency {
    name: string;
    version?: string;
  }

  export interface Flags {
    [key: string]: boolean | string;
  }

  /**
   * Workspace
   */
  export function toWorkspaceAddOptions(
    args: string[],
    flags: Flags
  ): WorkspaceAddOptions;
  export interface WorkspaceAddOptions {
    cwd?: string;
    pkgName: string;
    deps: Dependency[];
    type: configDependencyType;
  }
  export function workspaceAdd(options: WorkspaceAddOptions);

  export interface WorkspaceRemoveOptions {
    cwd?: string;
    pkgName: string;
    deps: string[];
  }
  export function workspaceRemove(options: WorkspaceRemoveOptions);

  /**
   * Workspaces
   */
  export interface WorkspacesRemoveOptions {
    deps: Dependency[];
    filterOpts: object;
  }
  export function workspacesRemove(options: WorkspacesRemoveOptions);

  export interface WorkspacesUpgradeOptions {
    deps: string[];
    filterOpts: object;
    flags: Flags;
  }
  export function workspacesUpgrade(options: WorkspacesUpgradeOptions);

  /**
   * Project
   */
  export interface ProjectAddOptions {
    deps: Dependency[];
    type: configDependencyType;
  }
  export function projectAdd(options: ProjectAddOptions);

  export interface ProjectRemoveOptions {
    deps: string[];
  }
  export function projectRemove(options: ProjectRemoveOptions);

  export interface ProjectUpgradeOptions {
    deps: Dependency[];
    flags: string[];
  }
  export function projectUpgrade(options: ProjectUpgradeOptions);
}
