declare module "bolt" {
  export namespace PackageJSON {
    export interface Scripts {
      [key: string]: string;
    }

    export interface Dependencies {
      [key: string]: string;
    }

    export interface PackageJSON {
      name: string;
      version: string;
      scripts: Scripts;
      dependencies: Dependencies;
    }
  }

  export type Args = string[];

  export interface FilterOpts {
    only?: string;
    ignore?: string;
    onlyFs?: string;
    ignoreFs?: string;
  }

  export enum configDependencyType {
    DEPENDENCIES = "dependencies",
    DEV_DEPENDENCIES = "devDependencies",
    PEER_DEPENDENCIES = "peerDependencies",
    OPTIONAL_DEPENDENCIES = "optionalDependencies"
  }

  export interface Workspace {
    dir: string;
    name: string;
    config: PackageJSON.PackageJSON;
  }

  export function getWorkspaces(): Workspace[];
  export function getDependencyGraph(): any;
  export function getProject(): {
    config: PackageJSON.PackageJSON;
  };

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
  export function workspaceAdd(options: WorkspaceAddOptions): void;

  export interface WorkspaceRemoveOptions {
    cwd?: string;
    pkgName: string;
    deps: string[];
  }
  export function workspaceRemove(options: WorkspaceRemoveOptions): void;

  export interface WorkspaceRunOptions {
    cwd?: string;
    pkgName: string;
    script: string;
    scriptArgs: Args;
  }
  export function workspaceRun(options: WorkspaceRunOptions): void;

  /**
   * Workspaces
   */
  export interface WorkspacesRemoveOptions {
    deps: string[];
    filterOpts: object;
  }
  export function workspacesRemove(options: WorkspacesRemoveOptions): void;

  export interface WorkspacesUpgradeOptions {
    deps: string[];
    filterOpts: object;
    flags: Flags;
  }
  export function workspacesUpgrade(options: WorkspacesUpgradeOptions): void;

  export interface WorkspacesRunOptions {
    cwd?: string;
    script: string;
    scriptArgs: Args;
    filterOpts: FilterOpts;
  }
  export function workspacesRun(options: WorkspacesRunOptions): void;

  /**
   * Project
   */
  export interface ProjectAddOptions {
    deps: Dependency[];
    type: configDependencyType;
  }
  export function projectAdd(options: ProjectAddOptions): void;

  export interface ProjectRemoveOptions {
    deps: string[];
  }
  export function projectRemove(options: ProjectRemoveOptions): void;

  export interface ProjectUpgradeOptions {
    deps: Dependency[];
    flags: string[];
  }
  export function projectUpgrade(options: ProjectUpgradeOptions): void;

  export interface ProjectRunOptions {
    cwd?: string;
    script: string;
    scriptArgs: Args;
  }
  export function projectRun(options: ProjectRunOptions): void;
}
