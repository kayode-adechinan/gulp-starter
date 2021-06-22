module.exports = {
  content: ["./src/app/**/*.ts", "./src/app/**/*.html"],
  //content: ["**/*.js", "**/*.html", "**/*.vue"],
  css: ["./src/assets/css/style.css"],
  keyframes: true,
  fontFace: true,
  variables: true,
  output: "build/style.css",
};

// purge css algo
// read the angular jons file
// get the styles section
// grad the scss files
// compile to css
// purge
// run build
// replace the old css files
