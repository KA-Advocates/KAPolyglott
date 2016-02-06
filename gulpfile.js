var gulp = require("gulp"),
babel = require("gulp-babel");

gulp.task('watch-cs', ['build-cs'], function() {
  gulp.watch('./ext/src/common/es6-src/**/*.js', ['build-cs']);
});

gulp.task('build-cs', function() {
  return gulp.src('./ext/src/common/es6-src/contentScript.js')
          .pipe(babel({
            presets: ['es2015']
          }))
          // catch and print errors
          .on('error', console.error.bind(console))
          // put files to chrome data dir
          .pipe(gulp.dest('./'));
});