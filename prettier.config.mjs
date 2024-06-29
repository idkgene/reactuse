import vercelPrettierOptions from '@vercel/style-guide/prettier';

/** @type {import("prettier").Config} */
const config = {
  ...vercelPrettierOptions,
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: [...vercelPrettierOptions.plugins, 'prettier-plugin-prisma'],
};

export default config;
