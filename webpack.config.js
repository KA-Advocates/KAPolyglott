module.exports = {
  entry  : "./ext/src/common/es6-src/contentScript.js",
  output : { 
    path: __dirname,
    filename: "./ext/src/common/contentScriptWebpackBuild.js"  
  },
  module:{
    loaders: [
      { 
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }  
}
