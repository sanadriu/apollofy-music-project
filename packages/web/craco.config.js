const path = require("path");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssFocusVisible = require("postcss-focus-visible");

const purgecss = require("@fullhuman/postcss-purgecss");
// eslint-disable-next-line spaced-comment
/*const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    path.resolve(__dirname, "..", "src", "**", "!(*.test).js"),
    path.resolve(__dirname, "..", "src", "**", "*.html"),
  ],
  // This extractor is used for tailwind classes.
  // Read more here: https://tailwindcss.com/docs/controlling-file-size/
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});*/

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        postcssFocusVisible,
        autoprefixer,
        purgecss({
          content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.ts"],
        }),
      ],
    },
  },
};
/*
module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        postcssFocusVisible,
        autoprefixer,
        ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
      ],
    },
  },
};
*/
