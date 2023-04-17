const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // Change to your "entry-point".
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
        },{
            test:/\.(css|scss)$/,
            use: ['style-loader','css-loader','sass-loader']
        }],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    plugins:[ 
        new HtmlWebpackPlugin({
                    title:'index',
                    template:'src/index.html'
                }),
        ]
};
