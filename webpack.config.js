const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template:"./src/index.html",
			filename:"index.html"

		}),
		new UglifyJSPlugin(),
		new MiniCssExtractPlugin({ filename: 'style.css' })
	],
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
	  open: true,
	},

	mode: 'production'
};
