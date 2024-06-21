import shared from '@vercel/style-guide/prettier';

/** @type {import("prettier").Config} */
module.exports = {
  ...shared,
  semi: false,
  singleQuote: false,
  trailingComma: 'none',
};
