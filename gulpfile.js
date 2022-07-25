const {src, dest, task, series, watch} = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");

// sass.compiler = require('node-sass');

const files = ["sass/abstract/*.scss", "sass/base/*.scss", "sass/components/*.scss", "sass/pages/*.scss"];

task("clean", () => {
    return src("dist/**/*", {read: false}).pipe(rm());
});

task("copy", () => {
    return src(files).pipe(dest("dist"));
});

task("styles", () => {
    return src(files)
        .pipe(concat("main.scss"))
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("dist"));
});

watch(files, series("styles"));

task("default", series("clean", "styles"));
