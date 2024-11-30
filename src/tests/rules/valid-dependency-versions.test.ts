import { rule } from "../../rules/valid-dependency-versions.js";
import { ruleTester } from "./ruleTester.js";

// @ts-expect-error -- I don't know why this is happening.
ruleTester.run("valid-dependency-versions", rule, {
	invalid: [
		{
			code: `{ "dependencies": { "abc": "invalid" } }`,
			errors: [{ column: 19, messageId: "invalid" }],
		},
		{
			code: `{ "dependencies": { "abc": "^1.2.3 |" } }`,
			errors: [{ column: 19, messageId: "invalid" }],
		},
		{
			code: `{ "devDependencies": { "abc": "invalid" } }`,
			errors: [{ column: 22, messageId: "invalid" }],
		},
		{
			code: `{ "peerDependencies": { "abc": "invalid" } }`,
			errors: [{ column: 23, messageId: "invalid" }],
		},
		{
			code: `{ "dependencies": { "abc": "invalid" } }`,
			errors: [{ column: 19, messageId: "invalid" }],
			options: [{ allowedTags: [] }],
		},
		{
			code: `{ "dependencies": { "abc": "invalid" } }`,
			errors: [{ column: 19, messageId: "invalid" }],
			options: [{ allowedTags: ["valid"] }],
		},
	],
	valid: [
		"{}",
		`{ "version": "invalid" }`,
		`{ "other": { "version": "invalid" } }`,
		`{ "dependencies": null }`,
		`{ "dependencies": [] }`,
		`{ "dependencies": 123 }`,
		`{ "dependencies": { "abc": "1.2.3" } }`,
		`{ "dependencies": { "abc": "^1.2.3" } }`,
		`{ "dependencies": { "abc": "~1.2.3" } }`,
		`{ "dependencies": { "abc": null } }`,
		`{ "dependencies": { "abc": [] } }`,
		`{ "dependencies": { "abc": 123 } }`,
		`{ "devDependencies": { "abc": "1.2.3" } }`,
		`{ "peerDependencies": { "abc": "1.2.3" } }`,
		`{ "dependencies": { "abc": "1.2.3-alpha" } }`,
		`{ "dependencies": { "abc": "1.2.3-alpha.0" } }`,
		{
			code: `{ "dependencies": { "abc": "valid" } }`,
			errors: [{ column: 19, messageId: "valid" }],
			options: [{ allowedTags: ["valid"] }],
		},
		{
			code: `{ "devDependencies": { "abc": "valid" } }`,
			errors: [{ column: 19, messageId: "valid" }],
			options: [{ allowedTags: ["valid"] }],
		},
		{
			code: `{ "peerDependencies": { "abc": "valid" } }`,
			errors: [{ column: 19, messageId: "valid" }],
			options: [{ allowedTags: ["valid"] }],
		},
	],
});
