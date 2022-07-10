const path = require("path");

const basePath = path.join(__dirname, "..");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	target: "electron-renderer",
	mode: "development",
	entry: path.join(basePath, "renderer/index.jsx"),
	output: {
		path: path.join(basePath, "dist"),
		filename: "index.js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
			},
			{
				test: /\.(css)$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: { extensions: [".js", ".jsx"] },
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(basePath, "renderer/index.html"),
		}),
	],
	devServer: {
		port: "8080",
		static: {
			directory: path.join(basePath, "public"),
		},
		hot: true,
	},
};
