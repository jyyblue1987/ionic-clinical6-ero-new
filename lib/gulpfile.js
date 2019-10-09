var gulp = require('gulp'), sass = require('gulp-sass'), runSequence = require('run-sequence'), 
// minifyCss   = require('gulp-minify-css'),
cleanCSS = require('gulp-clean-css'), sourcemaps = require('gulp-sourcemaps'), tsc = require('gulp-typescript'), embedTemplates = require('gulp-inline-ng2-template'), exec = require('child_process').exec;
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var header = require('gulp-header');
//----
//build steps
gulp.task('build', function (done) {
    runSequence('clean-lib', 'compile-sass', 'compile-typings');
});
//----
//clearing the output dir
gulp.task('clean-lib', function (done) {
    exec('rm -rf lib', function (err, stdOut, stdErr) {
        if (err) {
            done(err);
        }
        else {
            done();
        }
    });
});
//----
//typescript compilation including sourcemaps and template embedding
gulp.task('compile-typings', function () {
    //loading typings file
    var tsProject = tsc.createProject('tsconfig.json');
    gutil.log('Hello world!');
    return tsProject.src()
        .pipe(embedTemplates({
        base: '/src',
        useRelativePaths: true,
        styleProcessor: (stylePath, ext, styleFile, callback) => {
            // console.log('hi');
            gutil.log('Hello world2!');
            if (ext[0] === '.scss') {
                let sassObj = sass.renderSync({ file: stylePath });
                if (sassObj && sassObj['css']) {
                    styleFile = sassObj.css.toString('utf8');
                }
            }
            return callback(null, styleFile);
        }
    }))
        .pipe(tsProject())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('lib'));
});
//----
//clearing the css file
gulp.task('clean-css', function (done) {
    exec('find ./src -type f -name "*.css" -exec rm {} \\;', function (err, stdOut, stdErr) {
        if (err) {
            done(err);
        }
        else {
            done();
        }
    });
});
//Sass compilation and minifiction
gulp.task('compile-sass', function () {
    return runSequence('sass-clean', 'sass-add-default-imports', 'compile-sass-files', 'minify-css', 'sass-copy');
});
//clearing the css file
gulp.task('sass-clean', function (done) {
    return exec('rm -rf tmp', function (err, stdOut, stdErr) {
        if (err) {
            done(err);
        }
        else {
            done();
        }
    });
});
gulp.task('sass-copy-files', function () {
    return gulp.src(['./src/@ionic-clinical6/core/**/*.scss', './src/@ionic-clinical6/plugins/**/*.scss'])
        .pipe(gulp.dest('./tmp'));
});
gulp.task('sass-add-default-imports', function () {
    return gulp.src(['./src/@ionic-clinical6/core/**/*.scss', './src/@ionic-clinical6/plugins/**/*.scss'])
        .pipe(header('@import "variables.scss";\n@import "global.scss";\n'))
        .pipe(gulp.dest('./tmp/'));
});
gulp.task('compile-sass-files', function () {
    return gulp.src(['./tmp/**/*.scss'])
        .pipe(sass({
        outputStyle: 'expanded',
        includePaths: [
            './src/@ionic-clinical6/theme/'
        ]
    }).on('error', sass.logError))
        .pipe(concat('ionic-clinical6.scss'))
        .pipe(gulp.dest('./tmp'));
});
gulp.task('minify-css', function () {
    return gulp.src('./tmp/ionic-clinical6.scss')
        .pipe(cleanCSS({
        compatibility: '*',
        format: {
            breaks: {
                afterAtRule: true,
                afterBlockBegins: true,
                afterBlockEnds: true,
                afterComment: true,
                afterProperty: true,
                afterRuleBegins: true,
                afterRuleEnds: true,
                beforeBlockEnds: true,
                betweenSelectors: true // controls if a line break comes between selectors; defaults to `false`
            },
            indentBy: 2,
            indentWith: 'space',
            spaces: {
                aroundSelectorRelation: true,
                beforeBlockBegins: true,
                beforeValue: true // controls if a space comes before a value; e.g. `width: 1rem`; defaults to `false`
            },
            wrapAt: false // controls maximum line length; defaults to `false`
        },
        level: {
            1: {
                all: false,
            },
            2: {
                all: false,
                reduceNonAdjacentRules: true,
                removeDuplicateFontRules: false,
                removeDuplicateMediaBlocks: true,
                removeDuplicateRules: true,
            }
        }
    }))
        .pipe(gulp.dest('./tmp/lib'));
});
gulp.task('sass-copy', function () {
    return gulp.src('./tmp/lib/ionic-clinical6.scss')
        .pipe(gulp.dest('./lib/'));
});

//# sourceMappingURL=gulpfile.js.map
