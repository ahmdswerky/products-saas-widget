const { resolve, join } = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
const pkg = require('../package.json');

const versionNumber = pkg.version.split('.')[0];

// module.exports = merge(common, {
module.exports = {
	mode: 'production',
	target: 'web',
	entry: {
		app: join(__dirname, 'index.js'),
	},
	// resolve: {
	//	plugins: [
	//		new JavaScriptObfuscator({
	//			rotateStringArray: true,
	//		}),
	//	],
	// },
	plugins: [
		// new JavaScriptObfuscator({
		//	// renameGlobals: true,
		//	// renameProperties: false,
		//	// globalIdentifiers: {
		//	//	baseURL: 'llllllllll',
		//	// },
		//	// identifiersDictionary: ['baseURL'],
		//	// identifierNamesGenerator: 'dictionary',
		//	identifierNamesGenerator: 'mangled',
		//	// identifierNamesCache: { baseURL: 'baseURL' },
		//	// renamePropertiesMode: 'safe',
		//	// reservedNames: ['baseURL'],
		//	// reservedStrings: ['baseURL'],
		//	selfDefending: false,
		//	target: 'browser-no-eval',
		// }),
		new JavaScriptObfuscator({
			simplify: true,
			splitStrings: false,
			renameProperties: true,
			renamePropertiesMode: 'safe',
			unicodeEscapeSequence: false,
			identifierNamesGenerator: 'mangled',
			target: 'browser-no-eval',
			stringArrayWrappersType: 'function',
			stringArray: false,
			debugProtection: false,
			stringArrayEncoding: ['none'],
			reservedNames: ['baseURL', 'dispatchEvent'],
			stringArrayShuffle: false,
			stringArrayIndexShift: false,
			stringArrayWrappersChainedCalls: true,
			transformObjectKeys: true,
			stringArrayRotate: true,
			// stringArrayShuffle: true,
			// splitStrings: false,
			// optionsPreset: 'low-obfuscation',
		}),
	],
	output: {
		filename: 'integration.js',
		path: resolve(__dirname, `../dist/versions/${versionNumber}/`),
	},
};
