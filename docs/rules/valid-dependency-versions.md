# valid-dependency-versions

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Ensures that versions of `dependencies`, `devDependencies`, and `peerDependencies` are valid semver versions.

Example of **incorrect** code for this rule:

```json
{
	"dependencies": {
		"emoji-blast": "oops"
	}
}
```

Example of **correct** code for this rule:

```json
{
	"dependencies": {
		"emoji-blast": "1.2.3"
	}
}
```

### Options

```json
{
	"package-json/valid-dependency-versions": [
		"error",
		{
			"allowedTags": ["beta", "next"]
		}
	]
}
```

#### Form

Any allowed release tags of versions.

Example of **incorrect** code for this rule with `"allowedTags": ["next"]`:

```json
{
	"dependencies": {
		"emoji-blast": "next"
	}
}
```

Example of **correct** code for this rule:

```json
{
	"dependencies": {
		"emoji-blast": "alpha"
	}
}
```
