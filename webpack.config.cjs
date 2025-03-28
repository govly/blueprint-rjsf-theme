const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: 'bp5-rjsf-theme.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            name: 'Bp5Theme',
            type: 'umd',
        },
        publicPath: '',
        globalObject: 'typeof self !== "undefined" ? self : this'
    },
    optimization: {
        minimize: false,
        usedExports: false,
        concatenateModules: false,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
    ],
    externals: {
        "@rjsf/core": '@rjsf/core',
        "@rjsf/utils": '@rjsf/utils',
        "react": "react",
        "@blueprintjs/core": "@blueprintjs/core"
    }
};
