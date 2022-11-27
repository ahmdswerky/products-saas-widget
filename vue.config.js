// const fs = require('fs');
// const CompressionPlugin = require('compression-webpack-plugin');
// const zlib = require('zlib');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const createAttributeRemover = require('vue-remove-attributes');
const pkg = require('./package.json');

const versionNumber = pkg.version.split('.')[0];

function removeDataTestAttrs(node) {
	if (node.type === 1 /* NodeTypes.ELEMENT */) {
		// eslint-disable-next-line no-param-reassign
		node.props = node.props.filter(prop =>
			prop.type === 6 /* NodeTypes.ATTRIBUTE */ ? prop.name !== 'data-testid' : true
		);
	}
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
	// devServer: {
	//	// host: 'localhost',
	//	host: '0.0.0.0',
	//	open: true,
	//	https: {
	//		key: fs.readFileSync('/home/swerky/dev/certificates/localhost.key'),
	//		cert: fs.readFileSync('/home/swerky/dev/certificates/localhost.crt'),
	//	},
	// },

	parallel: false,

	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.plugins.delete('html');
			config.plugins.delete('preload');
			config.plugins.delete('prefetch');
		}

		config.optimization.delete('splitChunks');

		// if (process.env.NODE_ENV === 'production') {
		//	config.module
		//		.rule('vue')
		//		.use('vue-loader')
		//		.tap(options => {
		//			console.log('options', options);
		//			// eslint-disable-next-line no-param-reassign
		//			options.compilerOptions = {
		//				...(options.compilerOptions || {}),
		//				nodeTransforms: [removeDataTestAttrs],
		//			};
		//			return options;
		//		});
		// }

		return config;
	},

	productionSourceMap: false,

	css: {
		extract: false,
	},

	// pluginOptions: {
	// compression: {
	//	brotli: {
	//		filename: '[file].br[query]',
	//		algorithm: 'brotliCompress',
	//		include: /\.(js|css|html|svg|json)(\?.*)?$/i,
	//		compressionOptions: {
	//			params: {
	//				[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
	//			},
	//		},
	//		minRatio: 0.8,
	//	},
	//	gzip: {
	//		filename: '[file].gz[query]',
	//		algorithm: 'gzip',
	//		include: /\.(js|css|html|svg|json)(\?.*)?$/i,
	//		minRatio: 0.8,
	//	},
	// },
	// },

	configureWebpack: {
		plugins: [
			// new BundleAnalyzerPlugin(),
			new webpack.DefinePlugin({
				'process.env': { NODE_ENV: JSON.stringify('production') },
			}),

			// new UglifyJsPlugin({
			//	uglifyOptions: { ecma: 5, compress: { keep_fnames: true }, warnings: false, mangle: { keep_fnames: true } },
			//	parallel: 4,
			// }),
		],
		// plugins: [new GenerateSW()],
		// plugins: [babelRemoveAttribute({

		// })],
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto',
				},

				// {
				//	test: /\.vue$/,
				//	use: {
				//		loader: 'vue-loader',
				//		options: {
				//			compilerOptions: {
				//				modules: [createAttributeRemover('data-testid')],
				//			},
				//		},
				//	},
				// },

				// {
				//	test: /\.(png|jpe?g|gif)$/i,
				//	loader: 'file-loader',
				//	options: {
				//		publicPath: 'http://127.0.0.1:5000',
				//		// outputPath: (url, resourcePath, context) => {
				//		//	// `resourcePath` is original absolute path to asset
				//		//	// `context` is directory where stored asset (`rootContext`) or `context` option

				//		//	// To get relative path you can use
				//		//	// const relativePath = path.relative(context, resourcePath);

				//		//	if (/images/.test(context)) {
				//		//		return `@/assets/images/${url}`;
				//		//	}

				//		//	return `@/asd${url}`;
				//		// },
				//	},
				// },
			],
		},
		optimization: {
			splitChunks: false,
			minimize: true,
			// minimizer: [
			// 	new TerserPlugin({
			// 		test: /\.(js|ts|vue)(\?.*)?$/i,
			// 	}),
			// ],
			// minimizer: [
			//	new UglifyJsPlugin({
			//		uglifyOptions: { ecma: 5, compress: { keep_fnames: true }, warnings: false, mangle: { keep_fnames: true } },
			//		parallel: 4,
			//	}),
			// ],
		},
		resolve: {
			extensions: ['*', '.ts', '.mjs', '.vue', '.json'],
			alias: {
				'@types': path.join(__dirname, 'src', 'types'),
				'@': path.join(__dirname, 'src'),
				// '~': path.join(__dirname, 'src'),
			},
		},
		output: {
			filename: `products.js`,
		},
	},

	// publicPath: process.env.APP_ENV === 'production' ? 'http://127.0.0.1:5000/' : '/',

	outputDir: `dist/releases/v${versionNumber}/`,

	filenameHashing: false,
};
