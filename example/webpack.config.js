const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_module/
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'release'),
        open: true,
        port: 3007,
        historyApiFallback: true
    }
}