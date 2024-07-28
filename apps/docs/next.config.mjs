import createMDX from 'fumadocs-mdx/config';
import createBundleAnalyzer from '@next/bundle-analyzer';
import { remarkDocGen, typescriptGenerator } from 'fumadocs-docgen';

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [[remarkDocGen, { generators: [typescriptGenerator()] }]],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withAnalyzer(withMDX(config));
