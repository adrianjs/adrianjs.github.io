var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
});

gulp.task('sass', function(){
  return gulp.src('resources/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('resources/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('resources/scss/**/*.scss', ['sass']);
  gulp.watch('**/*.html', browserSync.reload);
  gulp.watch('resources/js/**/*.js', browserSync.reload);
});

gulp.task('default', function(callback){
  runSequence(['sass', 'browserSync', 'watch'], callback)
});
