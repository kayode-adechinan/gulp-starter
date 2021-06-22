const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const purgecss = require("gulp-purgecss");
const imagemin = require("gulp-imagemin");

const {series} = require("gulp");

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

gulp.task("default", gulp.series("minify-css", "minify-image"));

gulp.task("watch", function () {
  gulp.watch("src/", gulp.series("minify-css", "minify-image"));
});
