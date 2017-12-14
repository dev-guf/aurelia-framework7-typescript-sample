const webpack = require('webpack')
const path = require('path')
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin')
const projectRoot = path.resolve(__dirname, '../')

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
      alias :{ 
        'aurelia-framework7-typescript':'aurelia-framework7-typescript/src/index' 
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader'
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
