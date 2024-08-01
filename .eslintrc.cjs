/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		"plugin:svelte/recommended"
	],
	overrides: [
		{
			files: [
				"*.svelte"
			],
			parser: "svelte-eslint-parser"
		}
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 13,
		extraFileExtensions: [".svelte"]
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^\\$\\$(Props|Events|Slots|Generic)$"
			}
		]
	}
};
