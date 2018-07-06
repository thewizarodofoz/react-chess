process.noDeprecation = true;

const webpack = require('webpack');
const package = require('./package.json');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCDNPlugin = require('webpack-highwinds-purge-plugin');
const S3Plugin = require('webpack-s3-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const contextPath = path.join(__dirname, './src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appEnv = process.env.NODE_ENV || 'development';
const isProduction = appEnv === 'production';
const isDevelopment = appEnv === 'development';
const destinationDir = (isProduction) ? `./lib` : `./build`;

const config = {

    stats: {
        errors: true,
        errorDetails: true,
        colors: true,
        modules: false,
        reasons: false,
        performance: true,
        timings: true
    },

    context: contextPath,

    entry: {
        chess: 'index.js'
    },

    resolve: {
        extensions: ['.js'],

        modules: [contextPath, 'node_modules']
    },

    output: {
        path: path.resolve(__dirname, destinationDir),
        publicPath: '/',
        chunkFilename: '_[name].js',
        filename: '[name].js',
        libraryTarget: 'umd',
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([destinationDir]),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.ProvidePlugin({
            'Promise': 'es6-promise'
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(appEnv),
            'process.env.VERSION': JSON.stringify(package.version)
        })
    ]
};


if (isProduction) {

    config.output.publicPath = `//static.vidazoo.com/basev/content-chess/${package.version}/`;

    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    config.plugins.push(new CompressionPlugin({
        asset: '[path]',
        algorithm: 'gzip',
        test: /\.js$/,
        minRatio: 0.8
    }));

    config.plugins.push(new S3Plugin({
        include: /.*\.(js)/,
        directory: `lib`,
        basePath: `content-chess/${package.version}/`,
        s3Options: {
            accessKeyId: process.env.VAULT_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.VAULT_AWS_SECRET_KEY_ID,
            region: 'us-east-1'
        },
        s3UploadOptions: {
            Bucket: 'basev',
            ContentEncoding: 'gzip'
        }
    }));

    config.plugins.push(new PurgeCDNPlugin([{
            url: `http://static.vidazoo.com/basev/content-chess/${package.version}/`,
            recursive: true
        }], {
            accountId: process.env.VAULT_HIGHWINDS_ACCOUNT_ID,
            token: process.env.VAULT_HIGHWINDS_TOKEN
        }
    ));
}

if (isDevelopment) {
    config.plugins.push(new HtmlWebpackPlugin({
        inject: "body",
        template: "../index.html"
    }));

    config.devtool = "#source-map";
    config.devServer = {
        contentBase: contextPath,
        port: 8282,
        open: true,
        openPage: '/index.html',
    };
}

module.exports = config;
