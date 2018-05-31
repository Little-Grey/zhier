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
    // gulp.src('./common/*.css')//公共样式的base
    gulp.src('./css/daren_css/*.css')//达人的css-daren
    // gulp.src('./css/explain_css/*.css')//知耳说明的css-explain
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        // .pipe(gulp.dest('dist/common'));//公共样式的base
        .pipe(gulp.dest('official/css/daren_css'));//达人的css-daren
        // .pipe(gulp.dest('dist/css/explain_css'));//知耳说明的css-explain
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
// 公共css---直接运行   gulp commoncss
gulp.task('commoncss', () => {
    gulp.src('./common/*.css')//公共样式的base
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('official/common'));//公共样式的base
});

// ============================js============================

// 达人的js---直接运行   gulp darenjs
gulp.task('darenjs', () => {
    // return gulp.src('js/*.js') //*星号代表所有
    return gulp.src('./js/daren_js/*.js') //达人的js-daren
    // return gulp.src('./common/*.js') //公共的js-common
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            outSourceMap: false,
            cache: true
        }))
        .pipe(gulp.dest('official/js/daren_js')); //达人的js-daren
        // .pipe(gulp.dest('dist/common')); //公共的js-common
});

// 公共的js---直接运行   gulp commonjs
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

// ============================html============================


// 达人的html---直接运行   gulp darenhtml
gulp.task('darenhtml', () => {
    // return gulp.src('html/*.html')
    return gulp.src('./html/daren_html/*.html')//达人的html-daren
    // return gulp.src('./html/explain_html/*.html')//达人的html-explain
        .pipe(htmlmin({
            minifyJS: true, //压缩页面的JS
            removeComments: true, //清楚HTML注释
            collapseWhitespace: true //压缩html
        }))
        .pipe(gulp.dest('official/html/daren_html'));//达人的html-daren
        // .pipe(gulp.dest('dist/html/explain_html'));//达人的html-explain
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


// ============================img============================

// 压缩图片---直接运行   gulp img
gulp.task('img', () => {
    return gulp.src('./images/daren_img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('official/images/daren_img'));
});