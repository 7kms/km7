'use strict';

const path = require('path')
const pathConfig = require('./pathConfig')
const isProduct = process.env.NODE_ENV === 'production'
const resolve = path.resolve
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const styleConfig = require('./styleConfig')
// https://webpack.js.org/configuration/
const config = {
    resolve:{
        extensions: [".js", ".json", ".jsx", ".ts"],
        alias: {
            '~lib': resolve(__dirname, '../src/client/lib'),
            '~less': resolve(__dirname, '../src/client/assets/less'),
            '~utils': resolve(__dirname, '../src/client/utils'),
            '~service': resolve(__dirname, '../src/client/service'),
            '~config': resolve(__dirname, '../src/client/config'),
            '~data': resolve(__dirname, '../src/client/data'),
            '~actions': resolve(__dirname, '../src/client/redux/actions'),
            '~components': resolve(__dirname, '../src/client/components'),
            "~images": resolve(__dirname, '../src/client/assets/images')
          },
    },
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                include: pathConfig.appSrc,
                enforce: 'pre',
                loader: require.resolve('eslint-loader')
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                  // "url" loader works just like "file" loader but it also embeds
                  // assets smaller than specified size as data URLs to avoid requests.
                  {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.ico$/],
                    loader: require.resolve('url-loader'),
                    options: {
                      limit: 512,
                      name: 'static/img/[name].[hash:6].[ext]',
                    },
                  },
                  // {
                  //   test: /\.json$/,
                  //   loader: require.resolve('json-loader')
                  // },
                  {
                    test: [/manifest.json$/],
                    loader: require.resolve('file-loader'),
                    options: {
                      publicPath: '/',
                      name: '[name].[ext]?v=[hash:6]',
                    },
                  },
                  // Process JS with Babel.
                  {
                    test: /\.(js|jsx|mjs)$/,
                    include: pathConfig.appSrc,
                    loader: require.resolve('babel-loader'),
                    options: isProduct ? {
                      
                      compact: true,
                    } : {
                      
                      // This is a feature of `babel-loader` for webpack (not Babel itself).
                      // It enables caching results in ./node_modules/.cache/babel-loader/
                      // directory for faster rebuilds.
                      cacheDirectory: true,
                    },
                  },
                  {
                    test: /\.tsx?$/,
                    use:[
                      {
                        loader: require.resolve('babel-loader')
                      },
                      {
                        loader: require.resolve('ts-loader')
                      }
                    ],
                    include: pathConfig.appSrc
                  },
                  // The notation here is somewhat confusing.
                  // "postcss" loader applies autoprefixer to our CSS.
                  // "css" loader resolves paths in CSS and adds assets as dependencies.
                  // "style" loader normally turns CSS into JS modules injecting <style>,
                  // but unlike in development configuration, we do something different.
                  // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
                  // (second argument), then grabs the result CSS and puts it into a
                  // separate file in our build process. This way we actually ship
                  // a single CSS file in production instead of JS code injecting <style>
                  // tags. If you use code splitting, however, any async bundles will still
                  // use the "style" loader inside the async code so CSS from them won't be
                  // in the main CSS file.
                  // "file" loader makes sure assets end up in the `build` folder.
                  // When you `import` an asset, you get its filename.
                  // This loader doesn't use a "test" so it will catch all modules
                  // that fall through the other loaders.
                  {
                    loader: require.resolve('file-loader'),
                    // Exclude `js` files to keep "css" loader working as it injects
                    // it's runtime that would otherwise processed through "file" loader.
                    // Also exclude `html` and `json` extensions so they get processed
                    // by webpacks internal loaders.
                    exclude: [/\.jsx?$/,/\.json$/,/\.(css|less)$/, /\.html$/],
                    options: {
                      name: 'static/media/[name].[hash:6].[ext]',
                    },
                  },
                  // ** STOP ** Are you adding a new loader?
                  // Make sure to add the new loader(s) before the "file" loader.
                ],
              }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "static/[name].css",
        chunkFilename: "static/[id].css"
      })
    ],
    stats: "errors-only"
}

module.exports = config