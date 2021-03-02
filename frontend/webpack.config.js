const path = require("path");
const dirPath = path.join(__dirname, "/dist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/app.tsx",
	output: {
		path: dirPath,
		filename: "bundle.js",
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(t|j)s?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.s(a|c)ss$/,
				loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	resolve: {
		extensions: [".js", ".tsx", ".ts", ".scss"],
	},
	devServer: {
		historyApiFallback: true,
	},
};
