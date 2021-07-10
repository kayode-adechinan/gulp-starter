const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const purgecss = require("gulp-purgecss");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")(require("sass"));
var browserSync = require("browser-sync").create();

gulp.task("minify-css", () => {
  return gulp
    .src("src/css/*.css")
    .pipe(concat("all.css"))
    .pipe(
      cleanCSS({
        format: "beautify",
        level: {
          2: {
            all: true,
          },
        },
      }),
    )
    .pipe(
      purgecss({
        content: ["src/**/*.html"],
      }),
    )
    .pipe(gulp.dest("dist/css"));
});

// gulp minify-css

gulp.task("minify-image", () => {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// gulp minify-image

// Static server
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });
});

gulp.task("sass", () => {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", gulp.series("minify-css", "minify-image"));

/*
gulp.task("watch", function () {
  gulp.watch("src/", gulp.series("minify-css", "minify-image"));
});
*/

gulp.task("watch", () => {
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
});

// Static Server + watching scss/html files
gulp.task(
  "serve",
  gulp.series("sass", function () {
    browserSync.init({
      server: "./src",
    });

    gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
  }),
);
