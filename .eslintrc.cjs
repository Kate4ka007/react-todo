module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.tsx", "*.ts", "*.jsx", "*.js"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "prettier"
      ],
      env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
      },
      plugins: [
        "@typescript-eslint",
        "react",
        "prettier",
        "react-hooks",
        "import",
        "simple-import-sort"
      ],
      rules: {
        "curly": ["error", "all"],
        "prettier/prettier": [
          "warn",
          {
            endOfLine: "auto"
          }
        ],
        "react/jsx-sort-props": "warn",
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "error",
        "import/no-unresolved": [2, { commonjs: true, amd: true }],
        "import/named": 2,
        "import/namespace": 2,
        "import/default": 2,
        "import/export": 2,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "comma-dangle": ["warn", "only-multiline"],
        "react/prop-types": "off",
        "react/display-name": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-var-requires": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
      },
      settings: {
        react: {
          pragma: "React",
          version: "detect"
        }
      }
    }
  ]
};
