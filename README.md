# update-monorepo-package-json
Update package.json dependencies in monorepo.

`semantic-release` plugin to update dependencies versions in your `package.json` based on versions in other package.json files in the same repo.

This plugin updates only its own package.json.

Based on `@semantic-release/npm` plugin.

To use put it before `@semantic-release/npm` in the `.releaserc`.

Plugin config options:

| Options      | Description                                                                                                         | Default                                                                                                                          |
|--------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `prefix` | prefix to prepend to a version string  | empty string |
| `suffix` | suffix to append to a version string | empty string |
| `pkgRoot` | Directory path to publish. | `.` |

Example:

```json
{
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "next",
    "next-major",
    {"name": "beta", "prerelease": true}, 
    {"name": "alpha", "prerelease": true}
  ],
  "extends": [
    "semantic-release-monorepo"
  ],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": [
            "BREAKING CHANGE",
            "BREAKING CHANGES",
            "BREAKING"
          ]
        }
      }
    ],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md",
        "changelogTitle": "Changelog"
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": [
            "BREAKING CHANGE",
            "BREAKING CHANGES",
            "BREAKING"
          ]
        },
        "writerOpts": {
          "commitsSort": [
            "subject",
            "scope"
          ]
        }
      }
    ],
    "update-monorepo-package-json",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
}
```
