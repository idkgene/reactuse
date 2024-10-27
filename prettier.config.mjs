import prettierOptions from '@reactuse/prettier-config'

/** @type {import("prettier").Config} */
const config = {
  ...prettierOptions,
  plugins: [...prettierOptions.plugins],
};

export default config;
