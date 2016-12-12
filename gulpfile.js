var gulp = require('gulp');
var rev = require('gulp-rev'); //给每个文件添加版本号，哈希码，避免了人工维护造成的问题
var revReplace = require('gulp-rev-replace'); //更新index里面的引用
var useref = require('gulp-useref'); //自动合并打包css，js文件为一个文件
var filter = require('gulp-filter'); //过滤器，筛选和恢复
var uglify = require('gulp-uglify'); //压缩js代码的插件
var csso = require('gulp-csso'); //压缩css代码的插件

gulp.task('default', function() {
    var jsFilter = filter('**/*.js', { restore: true });
    var cssFilter = filter('**/*.css', { restore: true });
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });

    return gulp.src('src/index.html') //pipe相当于过滤器
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
