const { resolve, join } = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');
// const CompressionPlugin = require('compression-webpack-plugin');
const pkg = require('../package.json');

const versionNumber = pkg.version.split('.')[0];

// import { resolve } from 'path';

// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	target: 'web',
	entry: {
		app: join(__dirname, 'index.js'),
	},
	plugins: [
		new JavaScriptObfuscator({
			rotateStringArray: true,
		}),
		// new CompressionPlugin({
		//	algorithm: 'gzip',
		// }),
		//	// new HtmlWebpackPlugin({
		//	//	title: "Production",
		//	// }),
		//	// new WebpackObfuscator({
		//	//	rotateStringArray: true,
		//	// }),
	],
	output: {
		// filename: '[name].js',
		filename: 'integration.js',
		path: resolve(__dirname, `../dist/versions/${versionNumber}/`),
		// clean: true,
	},
};
