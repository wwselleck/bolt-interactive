> Currently on version 0.1.0 and not the world's most thorougly tested package, but seems to work well for the features that are added so far (adding, removing, and updating packages). Use at yo own risk, though.

# bolt-interactive
An interactive CLI tool for managing your [bolt](https://github.com/boltpkg/bolt) projects.

## Get Started
```
yarn global add @wwselleck/bolt-interactive
bolti
```

## Features
| bolt command| project | all workspaces | select workspaces|
--------------|---------|----------------|------------------|
| add         | ✅      |✅              | ✅
| remove      | ✅      |✅              | ✅
| upgrade     | ✅      |✅              | n/a

![](./docs/example.gif)
### Development
##### Why is bolt a devDependency and peerDependency?
I `npm link @wwselleck/bolt-interactive` in the example folder, but since `bolt` isn't installed in the main package (since it's a peerDependency), it won't be able to find it when symlinked. Installing `bolt` in the main package as a devDependency gets around this. See https://github.com/npm/npm/issues/5875.
