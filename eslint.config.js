import config from "@antfu/eslint-config";
import prettier from "eslint-config-prettier";

export default config({
	stylistic: false,
	regexp: false,
	rules: {
		curly: "off",
		"no-console": "off",
		"no-eval": "off",
		"no-labels": "off",
		"import/order": "off",
		"jsonc/sort-keys": "off",
		"ts/ban-ts-comment": "off",
		"ts/prefer-ts-expect-error": "off",
		"unused-imports/no-unused-vars": "off",
		"perfectionist/sort-imports": [
			"error",
			{
				newlinesBetween: "ignore",
				groups: [
					"side-effect",
					"side-effect-style",
					"builtin",
					"external",
					"internal",
					"internal-type",
					"parent",
					"parent-type",
					"sibling",
					"sibling-type",
					"index",
					"index-type",
					"object",
					"unknown",
				],
			},
		],
	},
	ignores: ["README.md"],
}).append(prettier);
