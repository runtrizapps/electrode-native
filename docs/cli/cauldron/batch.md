## `ern cauldron batch`

#### Description

* Combine multiple Cauldron operations in a single command  

#### Syntax

`ern cauldron batch`  

**Options**  

`--addDependencies <dependencies..>`

* Add one or more native dependency versions to a target native application version Container  

`--updateDependencies <dependencies..>`  

* Update the version of one or more native dependencies in a native mobile application version Container

`--delDependencies <dependencies..>`

* Remove one or more native dependencies from a target native application version Container


`--addMiniapps <miniapps..>`

* Add one or more MiniApp versions to a target native application version Container


`--updateMiniapps <miniapps..>`

* Update the version of one or more MiniApps in a target native application version Container


`--delMiniapps <miniapps..>`

* Remove one or more MiniApps from a target native application version Container  

#### Remarks

* The `ern cauldron batch [--option <value..>]` command performs operations in the following order:  

1) [delDependencies]  
2) [delMiniapps]  
3) [updateDependencies]  
4) [addDependencies]  
5) [updateMiniapps]  
6) [addMiniapps]

* The following types of MiniApp paths are not supported by `--addMiniapps` and `--updateMiniApps` :
  - File path (ex `file://Users/foo/MiniApp`)
  - Git path missing branch/tag or commit sha (ex: `https://github.com/foo/MiniApp.git`)
  - Registry path missing version (ex: `MiniApp`)
  - Registry path using a version range (ex: `MiniApp@^1.0.0`)

[delDependencies]: del/dependencies.md
[delMiniapps]: del/miniapps.md
[updateDependencies]: update/dependencies.md
[updateMiniapps]: update/miniapps.md
[addDependencies]: add/dependencies.md
[addMiniapps]: add/miniapps.md
