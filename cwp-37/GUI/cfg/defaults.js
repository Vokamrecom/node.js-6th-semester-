/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require("path");
const srcPath = path.join(__dirname, "/../src");
const dfltPort = 8000;

//const extractCSS = new ExtractTextPlugin('./css/App.css');
/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: "eslint-loader"
      }
    ],
    loaders: [
      /*{
        test: /\.css$/,
        use: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader',
        }),
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions'
      },*/
      { 
        test: /\.css$/, 
        //loader: ExtractTextPlugin.extract("style-loader", "css-loader", 'csso-loader', 'autoprefixer-loader') 
        loader: 'style-loader!css-loader!autoprefixer-loader!csso-loader'
      },
      /*{
        test: /\.css$/,
        loader:
          "style-loader!css-loader!csso-loader!autoprefixer-loader?browsers=last 2 versions"
      },*/
      {
        test: /\.sass/,
        loader:
          "style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax"
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: "url-loader?limit=8192"
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: "file-loader"
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: "/assets/",
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
