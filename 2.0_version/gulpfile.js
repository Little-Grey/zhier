const gulp = require('gulp'), //引入gulp
    cleanCSS = require('gulp-clean-css'), //引入压缩CSS
    autoprefixer = require('gulp-autoprefixer'), // 添加css前缀包
    uglify = require('gulp-uglify'), //引入压缩js的
    htmlmin = require('gulp-htmlmin'), //引入压缩html
    imagemin = require('gulp-imagemin'), //引入压缩图片
    babel = require('gulp-babel')
    
// ============================css============================

// 达人的css---直接运行   gulp darencss
gulp.task('darencss', () => {
    gulp.src('./css/daren_css/*.css')//达人的css-daren
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('official/css/daren_css'));//达人的css-daren
});
// 知耳说明的css---直接运行   gulp explaincss
gulp.task('explaincss', () => {
    gulp.src('./css/explain_css/*.css')//知耳说明的css-explain
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('official/css/explain_css'));//知耳说明的css-explain
});
// 分享页面的css---直接运行   gulp sharecss
gulp.task('sharecss', () => {
    gulp.src('./css/share_css/*.css')//知耳说明的css-explain
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('share/css/share_css'));//知耳说明的css-explain
});

// ============================公共css============================

// 正式版公共css---直接运行   gulp commoncss
gulp.task('commoncss', () => {
    gulp.src('./common/*.css')//公共样式的base
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('official/common'));//公共样式的base
});
// 测试版公共css---直接运行   gulp commoncss
gulp.task('testcommoncss', () => {
    gulp.src('./common/*.css')//公共样式的base
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('share/common'));//公共样式的base
});

// ============================js============================

// 达人的js---直接运行   gulp darenjs
gulp.task('darenjs', () => {
    return gulp.src('./js/daren_js/*.js') //达人的js-daren
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            outSourceMap: false,
            cache: true
        }))
        .pipe(gulp.dest('official/js/daren_js')); //达人的js-daren
});
// 分享页面的js---直接运行   gulp sharejs
gulp.task('sharejs', () => {
    return gulp.src('./js/share_js/*.js') //分享页面的js-sharejs
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            outSourceMap: false,
            cache: true
        }))
        .pipe(gulp.dest('share/js/share_js')); //分享页面的js-sharejs
});

// ============================公共的js============================

// 正式公共的js---直接运行   gulp commonjs
gulp.task('commonjs', () => {
    return gulp.src('./common/*.js') //公共的js-common
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            outSourceMap: false,
            cache: true
        }))
        .pipe(gulp.dest('official/common')); //公共的js-common
});
// 测试公共的js---直接运行   gulp commonjs
gulp.task('testcommonjs', () => {
    return gulp.src('./common/*.js') //公共的js-common
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            outSourceMap: false,
            cache: true
        }))
        .pipe(gulp.dest('share/common')); //公共的js-common
});

// ============================html============================


// 达人的html---直接运行   gulp darenhtml
gulp.task('darenhtml', () => {
    return gulp.src('./html/daren_html/*.html')//达人的html-daren
        .pipe(htmlmin({
            minifyJS: true, //压缩页面的JS
            removeComments: true, //清楚HTML注释
            collapseWhitespace: true //压缩html
        }))
        .pipe(gulp.dest('official/html/daren_html'));//达人的html-daren
});

// 达人说明的html---直接运行   gulp explainhtml
gulp.task('explainhtml', () => {
    return gulp.src('./html/explain_html/*.html')//达人说明的html-explain
        .pipe(htmlmin({
            minifyJS: true, //压缩页面的JS
            removeComments: true, //清楚HTML注释
            collapseWhitespace: true //压缩html
        }))
        .pipe(gulp.dest('official/html/explain_html'));//达人的html-explain
});
// 分享页面的html---直接运行   gulp sharehtml
gulp.task('sharehtml', () => {
    return gulp.src('./html/share_html/*.html')//分享页面的html-sharehtml
        .pipe(htmlmin({
            minifyJS: true, //压缩页面的JS
            removeComments: true, //清楚HTML注释
            collapseWhitespace: true //压缩html
        }))
        .pipe(gulp.dest('share/html/share_html'));//分享页面的html-sharehtml
});


// ============================img============================

// 达人的压缩图片---直接运行   gulp img
gulp.task('img', () => {
    return gulp.src('./images/daren_img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('official/images/daren_img'));
});
// 分享页面的压缩图片---直接运行   gulp img
gulp.task('shareimg', () => {
    return gulp.src('./images/share_img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('share/images/share_img'));
});