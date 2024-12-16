import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "warn",
      "no-console": "warn",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-return-await": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": [
        "error",
        {
          object: true,
          array: false,
        },
      ],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "req|res|next|val|err",
          varsIgnorePattern: "error",
        },
      ],
    },
  },
];
