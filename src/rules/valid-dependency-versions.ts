import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import semver from "semver";

import { createRule } from "../createRule.js";
import { isJSONStringLiteral } from "../utils/predicates.js";

const dependenciesKeys = new Set([
	"dependencies",
	"devDependencies",
	"peerDependencies",
]);

type Options = [{ allowedTags?: string[] }?];

export const rule = createRule<Options>({
	create(context) {
		const allowedTags = new Set(context.options[0]?.allowedTags);

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.type='JSONLiteral']"(
				node: JsonAST.JSONProperty & { key: JsonAST.JSONLiteral },
			) {
				if (
					typeof node.key.value !== "string" ||
					!dependenciesKeys.has(node.key.value) ||
					node.value.type !== "JSONObjectExpression"
				) {
					return;
				}

				for (const property of node.value.properties) {
					if (
						!isJSONStringLiteral(property.key) ||
						!isJSONStringLiteral(property.value) ||
						allowedTags.has(property.value.value)
					) {
						continue;
					}

					if (!isSemverRange(property.value.value)) {
						context.report({
							messageId: "invalid",
							node: node.value as unknown as ESTree.Node,
						});
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Checks existence of local dependencies in the package.json",
			recommended: true,
		},
		messages: {
			invalid: "Version is not a valid semver specifier.",
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					allowedTags: {
						items: {
							type: "string",
						},
						type: "array",
					},
				},
				type: "object",
			},
		],
	},
});

function isSemverRange(value: string) {
	try {
		return new semver.Range(value);
	} catch {
		return false;
	}
}
