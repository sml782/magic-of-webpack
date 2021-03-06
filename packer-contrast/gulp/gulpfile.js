const gulp = require('gulp');
const babel = require('gulp-babel');

function defaultTask(done) {
  gulp
    .src('src/app.js') // 读取源文件
    .pipe(
      babel({ // 传给babel任务
        presets: ['@babel/preset-env'],
      }),
    ).pipe(gulp.dest('dist')); // 写到dist里
  done();
}

exports.default = defaultTask;
