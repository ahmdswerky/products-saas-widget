module.exports = {
	collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
	coverageDirectory: './tests/coverage',
	// collectCoverage: true,
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	transform: {
		'^.+\\.vue$': 'vue-jest',
	},
};
