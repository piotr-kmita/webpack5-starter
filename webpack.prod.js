const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: 'js/main.min.js',   
  },
  optimization: {
    minimizer: [
      new TerserPlugin()
    ]
  },
  module: {
    rules: [
      { 
        test: /\.js$/, use: ['babel-loader'] 
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
           loader: 'css-loader',
           options: {         
             url: false,
           }
          },
          'postcss-loader',
          'sass-loader',
         ]
       },
       { 
        test: /\.(?:ico|svg|gif|png|jpg|jpeg)$/i, 
        type: 'asset/resource' 
      },
     ],
   },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.min.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src') + '/template.html',
      filename: 'index.html',
      minify: false,
      scriptLoading: 'blocking',
    }),
   
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"),
          to: "[path][name][ext]",
        },
      ],
    }), 
  ]
}