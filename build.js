var watch = require('watch');
var webpack = require("webpack");
var exec    = require("exec");
var webpackConfig = require("./webpack.config.js");
var concat = require('concat-files')

var compiler = webpack(webpackConfig);

compiler.watch({ // watch options:
  aggregateTimeout: 300, // wait so long for more changes
  poll: true // use polling instead of native watchers
}, function(err, stats) {
  console.log('1. File is changed');
  
  if(err)
    return handleFatalError(err);
  var jsonStats = stats.toJson();
  if(jsonStats.errors.length > 0)
     return handleErrors(jsonStats.errors);
  if(jsonStats.warnings.length > 0)
     return handleWarnings(jsonStats.warnings);
  
  console.log('2. Webpack build');  
   
  concat(['./ext/src/common/contentScriptTemplate.js','./ext/src/common/contentScriptWebpackBuild.js'], 
         './ext/src/common/contentScript.js',function(){
    
    console.log('3. Kango contentScript generated');  
    
    console.log('4. Running Kango Build');  

    
    exec(['python', 'kango/kango.py', 'build', 'ext'],function(err, out, code){
      console.log('5. Kango Built');  
      console.log(out);
      console.log('6. Watching again');  
      console.log('=================='); 
    });
    
  });
});



function handleErrors(errors){
  console.log('WEBPACK ERRORS');
  console.log('==============');
  printArray(errors);
}

function handleWarnings(warnings){
  console.log('WEBPACK WARNINGS');
  console.log('==============');
  printArray(warnings);
}

function printArray(array){
  array.forEach(function(e){
    console.log(e);
  });
}