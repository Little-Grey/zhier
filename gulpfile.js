const gulp = require('gulp'), //引入gulp
    cleanCSS = require('gulp-clean-css'), //引入压缩CSS
    autoprefixer = require('gulp-autoprefixer'), // 添加css前缀包
    uglify = require('gulp-uglify'), //引入压缩js的
    htmlmin = require('gulp-htmlmin'), //引入压缩html
    imagemin = require('gulp-imagemin') //引入压缩图片

// 压缩图片---直接运行   gulp css
gulp.task('css', () => {
    // gulp.src('css/index.css')
    gulp.src('css/*.css')
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
});

// 压缩图片---直接运行   gulp js
gulp.task('js', () => {
    return gulp.src('js/*.js') //*星号代表所有
        .pipe(uglify())
        .pipe(gulp.dest('dist/jss'));
});

// 压缩html---直接运行   gulp html
gulp.task('html', () => {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            minifyJS: true, //压缩页面的JS
            removeComments: true, //清楚HTML注释
            collapseWhitespace: true //压缩html
        }))
        .pipe(gulp.dest('dist'));
});

// 压缩图片---直接运行   gulp img
gulp.task('img', () => {
    return gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});