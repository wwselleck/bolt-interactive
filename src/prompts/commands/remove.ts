import {
  projectRemove,
  workspaceRemove,
  workspacesRemove
} from "bolt";
import runPackagesInputPrompt from '../packagesInput';
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

export default async function runRemovePrompt() {
  const scope = await runScopeSelectPrompt();
  const packagesInput = await runPackagesInputPrompt({
    message: 'What package(s) to remove?'
  });

  const packages: string[] = packagesInput.split(" ");

  if (scope.kind === ScopeType.PROJECT) {
    await projectRemove({
      deps: packages
    });
  } else if (scope.kind === ScopeType.ALL) {
    await workspacesRemove({
      deps: packages,
      filterOpts: {}
    });
  } else if (scope.kind === ScopeType.SELECT) {
    for (const w of scope.workspaces) {
      await workspaceRemove({
        pkgName: w.name,
        deps: packages
      });
    }
  }
}
