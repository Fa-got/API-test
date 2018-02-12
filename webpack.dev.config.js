// const fs = require("fs");
// // const path = require("path");
//
// const nodeModules = {};
// fs
// 	.readdirSync("node_modules")
// 	.filter(x => [".bin"].indexOf(x) === -1)
// 	.forEach(mod => {
// 		nodeModules[mod] = `commonjs ${mod}`;
// 	});

module.exports = {
	entry: [
		`${__dirname}/source/js/index`,
		`${__dirname}/node_modules/webpack/hot/dev-server`
	],
	// externals: nodeModules,
	output: {
		path: `${__dirname}/build/`,
		publicPath: "/build/",
		filename: "main.min.js"
	},
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2|otf)$/,
				exclude: /node_modules/,
				use: {
					loader: "file-loader",
					options: {
						name: "[path][name].[ext]"
					}
				}
			},
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.json$/,
				use: "json-loader"
			}
		]
	},
	devServer: {
		contentBase: "./",
		inline: true,
		hot: true,
		historyApiFallback: true
	}
};