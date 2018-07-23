# bolt-interactive
An interactive CLI tool for managing your [bolt](https://github.com/boltpkg/bolt) projects.

#### Development
##### Why is bolt a devDependency and peerDependency?
I `npm link @wwselleck/bolt-interactive` in the example folder, but since `bolt` isn't installed in the main package (since it's a peerDependency), it won't be able to find it when symlinked. Installing `bolt` in the main package as a devDependency gets around this. See https://github.com/npm/npm/issues/5875.
