const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = [
    {
        mode: process.env.MODE || "development",
        entry: "./src/electron/main.ts",
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: ["ts-loader"]
                }
            ]
        },
        output: {
            path: __dirname + "/build",
            filename: "main.js"
        },
        resolve: {
            extensions: [".ts"]
        },
        externals: {
            knex: "commonjs knex"
        }
    },
    {
        mode: process.env.MODE || "development",
        entry: "./src/electron/preload.ts",
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: ["ts-loader"]
                }
            ]
        },
        output: {
            path: __dirname + "/build",
            filename: "preload.js"
        }
    },
    {
        mode: process.env.MODE || "development",
        entry: "./src/ui/index.tsx",
        target: "electron-renderer",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: ["ts-loader"]
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        output: {
            path: __dirname + "/build",
            filename: "index.js"
        },
        resolve: {
            extensions: [".js", ".ts", ".tsx"]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/ui/index.html"
            })
        ]
    }
]
