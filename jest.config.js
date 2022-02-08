module.exports = {
	collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
	coverageDirectory: './tests/coverage',
	// collectCoverage: true,
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	verbose: true,
	displayName: {
		name: 'CLIENT',
		color: 'blue',
	},
	setupFilesAfterEnv: ['./jest.setup.js'],
	transform: {
		'^.+\\.vue$': 'vue-jest',
	},
};
