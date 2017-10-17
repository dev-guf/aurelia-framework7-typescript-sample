const webpack = require('webpack')
const path = require('path')
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin')

module.exports = (env = {}) => {
  // Variables set by npm scripts in package.json
  const isProduction = env.production === true
  const platform = env.platform // 'default' by default

  return {
    entry: {
      main: [
        './src/main.ts'
      ]
    },
    output: {
      path: path.join(__dirname, 'www/dist'),
      publicPath: '/dist/',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: ["src", "node_modules"].map(x => path.resolve(x)),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.(png|gif|jpg)$/,
          loader: 'url-loader',
          options: { limit: '25000' }
        },
        {
          test: /\.(ttf|eot|svg)$/,
          loader: 'file-loader'
        },
        { 
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
          loader: 'url-loader?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff' },
      ]
    },
    plugins: [
      new AureliaPlugin({ includeAll: "src" }),
      new ModuleDependenciesPlugin(
        {
          "aurelia-framework7-typescript":[
            "components/f7-view"
          ]
        }),
    
      new webpack.DefinePlugin({
        // Allows these constants to be accessed by the aurelia app
        PRODUCTION: JSON.stringify(isProduction),
        PLATFORM: JSON.stringify(platform)
      })
    ],
    devServer: {
      port: 3000
    }
  }
}
