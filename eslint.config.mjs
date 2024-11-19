import js from "@eslint/js";
import * as parser from "@typescript-eslint/parser";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import reactPlugin from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylistic from "@stylistic/eslint-plugin";
import noOnlyTests from "eslint-plugin-no-only-tests";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import markdown from "@eslint/markdown";
import antfu from "eslint-plugin-antfu";
import n from "eslint-plugin-n";
import unicorn from "eslint-plugin-unicorn";
import unused from "eslint-plugin-unused-imports";
import perfectionist from "eslint-plugin-perfectionist";
import regexp from "eslint-plugin-regexp";

import jsonc from "jsonc-eslint-parser";
import yaml from "yaml-eslint-parser";
import { GLOB_PATTERNS, LANGUAGE_OPTIONS, SETTINGS } from "./lib/constants";

const config = [
/*
.......##..######......######..########..######..
.......##.##....##....##....##.##.......##....##.
.......##.##..........##.......##.......##.......
.......##..######.....##.......######...##...####
.##....##.......##....##.......##.......##....##.
.##....##.##....##....##....##.##.......##....##.
..######...######......######..##........######..
*/
  {
    files: [GLOB_PATTERNS.JS],
    ...js.configs.recommended,
    antfu,
    unicorn,
    "unused-imports": unused,
    perfectionist,
    regexp,
    n,
    languageOptions: LANGUAGE_OPTIONS,
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: {
      // Best Practices
      /**
       * Require return statements in array methods callbacks.
       *
       * 🚫 Not fixable -https://eslint.org/docs/rules/array-callback-return
       */
      "array-callback-return": ["error", { allowImplicit: true }],
      /**
       * Treat `var` statements as if they were block scoped.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/block-scoped-var
       */
      "block-scoped-var": "error",
      /**
       * Require curly braces for multiline blocks.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/curly
       */
      curly: ["warn", "multi-line"],
      /**
       * Require default clauses in switch statements to be last (if used).
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/default-case-last
       */
      "default-case-last": "error",
      /**
       * Require triple equals (`===` and `!==`).
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/eqeqeq
       */
      eqeqeq: "error",
      /**
       * Require grouped accessor pairs in object literals and classes.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/grouped-accessor-pairs
       */
      "grouped-accessor-pairs": "error",
      /**
       * Disallow use of `alert()`.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-alert
       */
      "no-alert": "error",
      /**
       * Disallow use of `caller`/`callee`.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-caller
       */
      "no-caller": "error",
      /**
       * Disallow returning value in constructor.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-constructor-return
       */
      "no-constructor-return": "error",
      /**
       * Disallow using an `else` if the `if` block contains a return.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-else-return
       */
      "no-else-return": "warn",
      /**
       * Disallow `eval()`.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-eval
       */
      "no-eval": "error",
      /**
       * Disallow extending native objects.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-extend-native
       */
      "no-extend-native": "error",
      /**
       * Disallow unnecessary function binding.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-extra-bind
       */
      "no-extra-bind": "error",
      /**
       * Disallow unnecessary labels.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-extra-label
       */
      "no-extra-label": "error",
      /**
       * Disallow floating decimals.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-floating-decimal
       */
      "no-floating-decimal": "error",
      /**
       * Make people convert types explicitly e.g. `Boolean(foo)` instead of `!!foo`.
       *
       * 🔧 Partially Fixable - https://eslint.org/docs/rules/no-implicit-coercion
       */
      "no-implicit-coercion": "error",
      /**
       * Disallow use of `eval()`-like methods.
       *
       * https://eslint.org/docs/rules/no-implied-eval
       */
      "no-implied-eval": "error",
      /**
       * Disallow usage of `__iterator__` property.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-iterator
       */
      "no-iterator": "error",
      /**
       * Disallow use of labels for anything other than loops and switches.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-labels
       */
      "no-labels": ["error"],
      /**
       * Disallow unnecessary nested blocks.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-lone-blocks
       */
      "no-lone-blocks": "error",
      /**
       * Disallow `new` for side effects.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-new
       */
      "no-new": "error",
      /**
       * Disallow function constructors.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-new-func
       */
      "no-new-func": "error",
      /**
       * Disallow primitive wrapper instances, such as `new String('foo')`.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-new-wrappers
       */
      "no-new-wrappers": "error",
      /**
       * Disallow use of octal escape sequences in string literals.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-octal-escape
       */
      "no-octal-escape": "error",
      /**
       * Disallow reassignment of function parameters.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-param-reassign
       */
      "no-param-reassign": "error",
      /**
       * Disallow usage of the deprecated `__proto__` property.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-proto
       */
      "no-proto": "error",
      /**
       * Disallow assignment in `return` statement.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-return-assign
       */
      "no-return-assign": "error",
      /**
       * Disallow use of `javascript:` urls.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-script-url
       */
      "no-script-url": "error",
      /**
       * Disallow comparisons where both sides are exactly the same.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-self-compare
       */
      "no-self-compare": "error",
      /**
       * Disallow use of comma operator.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-sequences
       */
      "no-sequences": "error",
      /**
       * Disallow unnecessary `.call()` and `.apply()`.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-useless-call
       */
      "no-useless-call": "error",
      /**
       * Disallow unnecessary concatenation of strings.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-useless-concat
       */
      "no-useless-concat": "error",
      /**
       * Disallow redundant return statements.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-return
       */
      "no-useless-return": "warn",
      /**
       * Require using named capture groups in regular expressions.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-named-capture-group
       */
      "prefer-named-capture-group": "error",
      /**
       * Require using Error objects as Promise rejection reasons.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-promise-reject-errors
       */
      "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
      /**
       * Disallow use of the RegExp constructor in favor of regular expression
       * literals.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-regex-literals
       */
      "prefer-regex-literals": "error",
      /**
       * Disallow "Yoda conditions", ensuring the comparison.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/yoda
       */
      yoda: "warn",

      // Stylistic Rules

      /**
       * Require camel case names.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/camelcase
       */
      camelcase: [
        "error",
        {
          allow: ["^UNSAFE_"],
          ignoreDestructuring: false,
          properties: "never",
        },
      ],
      /**
       * Require function expressions to have a name.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/func-names
       */
      "func-names": ["error", "as-needed"],
      /**
       * Require a capital letter for constructors.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/new-cap
       */
      "new-cap": ["error", { capIsNew: false }],
      /**
       * Disallow the omission of parentheses when invoking a constructor with
       * no arguments.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/new-parens
       */
      "new-parens": "warn",
      /**
       * Disallow use of the Array constructor.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-array-constructor
       */
      "no-array-constructor": "error",
      /**
       * Disallow use of bitwise operators.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-bitwise
       */
      "no-bitwise": "error",
      /**
       * Disallow if as the only statement in an else block.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-lonely-if
       */
      "no-lonely-if": "warn",
      /**
       * Disallow use of chained assignment expressions.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-multi-assign
       */
      "no-multi-assign": ["error"],
      /**
       * Disallow nested ternary expressions.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-nested-ternary
       */
      "no-nested-ternary": "error",
      /**
       * Disallow ternary operators when simpler alternatives exist.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-unneeded-ternary
       */
      "no-unneeded-ternary": "error",
      /**
       * Require use of an object spread over Object.assign.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/prefer-object-spread
       */
      "prefer-object-spread": "warn",

      // Rules for Variables
      /**
       * Disallow labels that share a name with a variable.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-label-var
       */
      "no-label-var": "error",
      /**
       * Disallow initializing variables to `undefined`.
       *
       * 🔧 Fixable - https://eslint.org/docs/rules/no-undef-init
       */
      "no-undef-init": "warn",
      /**
       * Disallow unused variables.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-unused-vars
       */ "no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: false,
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

/*
.########..######......######..########..######..
....##....##....##....##....##.##.......##....##.
....##....##..........##.......##.......##.......
....##.....######.....##.......######...##...####
....##..........##....##.......##.......##....##.
....##....##....##....##....##.##.......##....##.
....##.....######......######..##........######..
*/
  {
    files: [GLOB_PATTERNS.TS],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      tsdoc: await import("eslint-plugin-tsdoc"),
    },
    settings: SETTINGS,
    rules: {
      /**
       * Require consistent usage of type exports.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-exports/
       */
      "@typescript-eslint/consistent-type-exports": [
        "warn",
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      /**
       * Require consistent usage of type imports.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
       */
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          disallowTypeAnnotations: true,
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      /**
       * Require explicit return types on functions and class methods.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
       */
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ],
      /**
       * Require using function property types in method signatures.
       *
       * These have enhanced typechecking, whereas method signatures do not.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
       */
      "@typescript-eslint/method-signature-style": "warn",
      /**
       * Require consistent naming conventions.
       *
       * Improves IntelliSense suggestions and avoids name collisions.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/naming-convention/
       */
      "@typescript-eslint/naming-convention": [
        "error",
        // Anything type-like should be written in PascalCase.
        {
          format: ["PascalCase"],
          selector: ["typeLike", "enumMember"],
        },
        // Interfaces cannot be prefixed with `I`, or have restricted names.
        {
          custom: {
            match: false,
            regex: "^I[A-Z]|^(Interface|Props|State)$",
          },
          format: ["PascalCase"],
          selector: "interface",
        },
      ],
      /**
       * Disallow members of unions and intersections that do nothing or override type information.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-redundant-type-constituents/
       */
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      /**
       * Disallow unnecessary namespace qualifiers.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/no-unnecessary-qualifier/
       */
      "@typescript-eslint/no-unnecessary-qualifier": "warn",
      /**
       * Require using `RegExp.exec()` over `String.match()` for consistency.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/prefer-regexp-exec/
       */
      "@typescript-eslint/prefer-regexp-exec": "warn",
      /**
       * Require Array#sort calls to provide a compare function.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/require-array-sort-compare/
       */
      "@typescript-eslint/require-array-sort-compare": [
        "error",
        { ignoreStringArrays: true },
      ],
      /**
       * Require exhaustive checks when using union types in switch statements.
       *
       * This ensures cases are considered when items are later added to a union.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
       */
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      /**
       * Require TSDoc comments conform to the TSDoc specification.
       *
       * 🚫 Not fixable - https://github.com/microsoft/tsdoc/tree/master/eslint-plugin
       */
      "tsdoc/syntax": "error",
    },
  },

/*
.########..########....###.....######..########.....######..########..######..
.##.....##.##.........##.##...##....##....##.......##....##.##.......##....##.
.##.....##.##........##...##..##..........##.......##.......##.......##.......
.########..######...##.....##.##..........##.......##.......######...##...####
.##...##...##.......#########.##..........##.......##.......##.......##....##.
.##....##..##.......##.....##.##....##....##.......##....##.##.......##....##.
.##.....##.########.##.....##..######.....##........######..##........######..
*/
  {
    files: [GLOB_PATTERNS.REACT],
    plugins: {
      "@eslint-react": reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      ...SETTINGS,
      react: {
        version: "detect",
        componentWrapperFunctions: ["memo", "forwardRef"],
      },
    },
    rules: {
      // TypeScript over `prop-types`, as `prop-types` can add
      // to a project's build size.
      "react/prop-types": "off",
      // Disable requiring React to be imported, as this is no longer required.
      "react/react-in-jsx-scope": "off",
      // This rule has been deprecated, but not yet removed.
      "jsx-a11y/no-onchange": "off",

      "react/button-has-type": "warn",
      /**
       * Require consistent function type for function components.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md
       */
      "react/function-component-definition": "warn",
      /**
       * Require destructuring and symmetric naming of `useState` hook value and setter variables.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
       */
      "react/hook-use-state": "warn",
      /**
       * Require consistent boolean attributes notation in JSX.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
       */
      "react/jsx-boolean-value": "warn",
      /**
       * Disallow unnecessary curly braces in JSX props and children.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
       */
      "react/jsx-curly-brace-presence": "warn",
      /**
       * Require using shorthand form for React fragments, unless required.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
       */
      "react/jsx-fragments": "warn",
      /**
       * Prevent problematic leaked values from being rendered.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
       */
      "react/jsx-no-leaked-render": "warn",
      /**
       * Prevents usage of unsafe `target='_blank'`.
       *
       * This rule is a part of `react/recommended`, but we've modified it to
       * allow referrer.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
       */
      "react/jsx-no-target-blank": [
        "error",
        {
          allowReferrer: true,
        },
      ],
      /**
       * Disallow empty React fragments.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
       */
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      /**
       * Require the use of PascalCase for user-defined JSX components.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
       */
      "react/jsx-pascal-case": "warn",
      /**
       * Disallow usage of Array index in keys.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
       */
      "react/no-array-index-key": "warn",
      /**
       * Disallow creating unstable components inside components.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
       */
      "react/no-unstable-nested-components": "error",
      /**
       * Disallow closing tags for components without children.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
       */
      "react/self-closing-comp": "warn",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

/*
.########.########..######..########....########.####.##.......########..######.
....##....##.......##....##....##.......##........##..##.......##.......##....##
....##....##.......##..........##.......##........##..##.......##.......##......
....##....######....######.....##.......######....##..##.......######....######.
....##....##.............##....##.......##........##..##.......##.............##
....##....##.......##....##....##.......##........##..##.......##.......##....##
....##....########..######.....##.......##.......####.########.########..######.
*/
  {
    files: [GLOB_PATTERNS.TEST],
    plugins: {
      vitest: await import("@vitest/eslint-plugin"),
      "no-only-tests": noOnlyTests,
    },
    rules: {
      /**
       * Disallow duplicate setup and teardown hooks.
       *
       * 🚫 Not fixable - https://github.com/veritem/eslint-plugin-vitest/blob/HEAD/docs/rules/no-duplicate-hooks.md
       */
      "vitest/no-duplicate-hooks": "error",
      /**
       * Require lowercase test names.
       *
       * 🔧 Fixable - https://github.com/veritem/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-lowercase-title.md
       */
      "vitest/prefer-lowercase-title": "warn",
    },
  },

/*
..######..########.##....##.##.......####..######..########.####..######.....########..##.....##.##.......########..######.
.##....##....##.....##..##..##........##..##....##....##.....##..##....##....##.....##.##.....##.##.......##.......##....##
.##..........##......####...##........##..##..........##.....##..##..........##.....##.##.....##.##.......##.......##......
..######.....##.......##....##........##...######.....##.....##..##..........########..##.....##.##.......######....######.
.......##....##.......##....##........##........##....##.....##..##..........##...##...##.....##.##.......##.............##
.##....##....##.......##....##........##..##....##....##.....##..##....##....##....##..##.....##.##.......##.......##....##
..######.....##.......##....########.####..######.....##....####..######.....##.....##..#######..########.########..######.
*/
  // {
  //   files: [GLOB_PATTERNS.STYLE],
  //   plugins: {
  //     "@stylistic": stylistic,
  //   },
  //   rules: {
  //     "@stylistic/semi": ["error", "always"],
  //     "@stylistic/quotes": ["error", "single"],
  //     "@stylistic/comma-dangle": ["error", "always-multiline"],
  //     "@stylistic/indent": ["error", 2],
  //     "@stylistic/arrow-parens": ["error", "always"],
  //     "@stylistic/brace-style": ["error", "1tbs"],
  //     "@stylistic/member-delimiter-style": [
  //       "error",
  //       {
  //         multiline: { delimiter: "semi", requireLast: true },
  //         singleline: { delimiter: "semi", requireLast: false },
  //       },
  //     ],
  //   },
  // },

/*
.......##..######...#######..##....##.....######...#######..##....##.########.####..######..
.......##.##....##.##.....##.###...##....##....##.##.....##.###...##.##........##..##....##.
.......##.##.......##.....##.####..##....##.......##.....##.####..##.##........##..##.......
.......##..######..##.....##.##.##.##....##.......##.....##.##.##.##.######....##..##...####
.##....##.......##.##.....##.##..####....##.......##.....##.##..####.##........##..##....##.
.##....##.##....##.##.....##.##...###....##....##.##.....##.##...###.##........##..##....##.
..######...######...#######..##....##.....######...#######..##....##.##.......####..######..
*/
  {
    files: [GLOB_PATTERNS.JSON],
    languageOptions: {
      parser: jsonc,
    },
    plugins: {
      jsonc: await import("eslint-plugin-jsonc"),
    },
    rules: {
      "jsonc/no-comments": "off",
      "jsonc/comma-dangle": ["error", "never"],
    },
  },

/*
.##....##....###....##.....##.##...........######...#######..##....##.########.####..######..
..##..##....##.##...###...###.##..........##....##.##.....##.###...##.##........##..##....##.
...####....##...##..####.####.##..........##.......##.....##.####..##.##........##..##.......
....##....##.....##.##.###.##.##..........##.......##.....##.##.##.##.######....##..##...####
....##....#########.##.....##.##..........##.......##.....##.##..####.##........##..##....##.
....##....##.....##.##.....##.##..........##....##.##.....##.##...###.##........##..##....##.
....##....##.....##.##.....##.########.....######...#######..##....##.##.......####..######..
*/
  {
    files: [GLOB_PATTERNS.YAML],
    languageOptions: {
      parser: yaml,
    },
    plugins: {
      yml: await import("eslint-plugin-yml"),
    },
    rules: {
      "yml/no-empty-mapping-value": "error",
      "yml/no-empty-sequence-entry": "error",
      "yml/no-multiple-empty-lines": "error",
      "yml/quotes": ["error", { prefer: "single" }],
      "yml/sort-keys": "error",
    },
  },

/*
.......##.....##.########......######..########..######..
.......###...###.##.....##....##....##.##.......##....##.
.......####.####.##.....##....##.......##.......##.......
.......##.###.##.##.....##....##.......######...##...####
.......##.....##.##.....##....##.......##.......##....##.
.......##.....##.##.....##....##....##.##.......##....##.
.......##.....##.########......######..##........######..
*/
  {
    files: [GLOB_PATTERNS.MARKDOWN],
    processor: markdown,
    plugins: {
      markdown: markdown,
    },
    rules: {
      "markdown/consistent-header-style": "error",
      "markdown/no-empty-links": "error",
      "markdown/no-trailing-spaces": "error",
    },
  },

/*
..######...#######..##....##.########.####..######......########.####.##.......########..######.
.##....##.##.....##.###...##.##........##..##....##.....##........##..##.......##.......##....##
.##.......##.....##.####..##.##........##..##...........##........##..##.......##.......##......
.##.......##.....##.##.##.##.######....##..##...####....######....##..##.......######....######.
.##.......##.....##.##..####.##........##..##....##.....##........##..##.......##.............##
.##....##.##.....##.##...###.##........##..##....##.....##........##..##.......##.......##....##
..######...#######..##....##.##.......####..######......##.......####.########.########..######.
*/
  {
    files: GLOB_PATTERNS.CONFIG,
    rules: {
      "import/no-default-export": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "unicorn/prefer-module": "off",
    },
  },

  // Ignore patterns
  {
    ignores: GLOB_PATTERNS.IGNORE,
  },
];

export default config;
