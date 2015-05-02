var gulp = require('gulp');

var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var rename = require("gulp-rename");
var dirSync = require('gulp-directory-sync');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('default', ['build']);

gulp.task("build", ["style:build", "script:build"], function () {});
gulp.task("style:build", ["style:less", "style:copy-lib", "style:copy-font"], function () {});
gulp.task("script:build", ["script:copy-lib"], function () {});

// 编译脚本
gulp.task("scripts:compile", function () {
    return gulp.src("src/js/**/*.js")
        .pipe(amdOptimize("moe", {wrapShim: true}))
        .pipe(concat("moe.js"))
        .pipe(gulp.dest("dist/js"));
});
gulp.task("scripts:minify", ["scripts:compile"], function () {
    return gulp.src("dist/js/moe.js")
        .pipe(concat("moe.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});


// 处理less文件并压缩输出
gulp.task("style:less", function () {
    return gulp.src("./src/less/moe.less")
        .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
        .pipe(minifyCSS())
        .pipe(rename("css/style.min.css"))
        .pipe(gulp.dest("./dist"));
});
// 将依赖的base样式文件复制到输出目录
gulp.task("style:copy-lib", function () {
    return gulp.src("./src/css/lib/*.css")
        .pipe(gulp.dest("dist/css/lib"));
});
// 复制依赖的字体文件
gulp.task("style:copy-font", function () {
    return gulp.src("./src/fonts/*")
        .pipe(gulp.dest("dist/fonts"));
});
// 复制依赖的脚本文件
gulp.task("script:copy-lib", function () {
    return gulp.src("./src/js/lib/*.js")
        .pipe(gulp.dest("dist/js/lib"));
});


// 同步输出文件到Demo目录
gulp.task("demo:sync", function () {
    gulp.src('')
        .pipe(dirSync("src/html", 'demo', {printSummary: true}))
        .pipe(dirSync("dist", 'demo/assets', {printSummary: true}))
        .on('error', function (e) {
            console.log(e);
        });
});
