'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css');

var paths = {
    sass: [
        './src/css/styling.scss'
    ],
    scripts: [
    	'./src/libs/jszip.js',
        './src/libs/three.js',
        './src/libs/ColladaLoader.js',
        './src/libs/terrainloader.js',
        './src/interface.js',
        './src/utility.js',
        './src/modules/setupPage.js',
        './src/modules/loadColladaModels.js',
        './src/modules/setupThreeScene.js',
        './src/modules/render.js',
        './src/modules/captureMouseMove.js',
        './src/modules/gatherInput.js',
        './src/modules/createVolumes.js',
        './src/modules/pageResize.js',
        './src/modules/changeValuesForTimescale.js',
        './src/modules/updateCameraPosition.js',
        './src/modules/handleScalingObjects.js',
        './src/modules/createEverest.js',
        './src/modules/switchScalingObjects.js',
        './src/modules/makeZipFile.js',
        './src/modules/outputStats.js',
        './src/core.js'
    ]
};

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('compare-widget.min.css')) 
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {
    return gulp.src( paths.scripts )
        .pipe(concat('compare-widget.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);
