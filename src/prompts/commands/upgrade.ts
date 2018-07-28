import {
  projectUpgrade,
  workspacesUpgrade
} from "bolt";
import { toDependency } from "../../bolt";
import runPackagesInputPrompt from '../packagesInput';
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

export default async function runUpgradePrompt() {
  const scope = await runScopeSelectPrompt({
    scopeTypes: [ScopeType.ALL, ScopeType.PROJECT]
  });
  const packagesInput = await runPackagesInputPrompt({
    message: 'What package(s) to upgrade?'
  });

  const packages: string[] = packagesInput.split(" ");
  if (scope.kind === ScopeType.PROJECT) {
    await projectUpgrade({
      deps: packages.map(toDependency),
      flags: []
    });
  } else if (scope.kind === ScopeType.ALL) {
    await workspacesUpgrade({
      deps: packages,
      filterOpts: [],
      flags: {}
    });
  }
}
