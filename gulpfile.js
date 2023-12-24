var gulp = require('gulp');
// const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const purgecss = require('gulp-purgecss');

gulp.task('scss', function() {
  return gulp.src('frontend/scss/app.scss')
    .pipe(sass())
    .pipe(purgecss({
      content: ['dist/**/*.html']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('js', function() {
  return gulp.src('frontend/js/*.js')
    .pipe(concat('app.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('watch', function() {
  gulp.watch('dist/**/*.html', gulp.series('scss'));
  gulp.watch('dist/**/*.html', gulp.series('js'));
  gulp.watch('frontend/js/*', gulp.series('js'));
  gulp.watch('frontend/scss/*', gulp.series('scss'));
});

gulp.task('default', gulp.series("scss", "js", "watch"));
