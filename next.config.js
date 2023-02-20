/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Now we can import GraphQL files as simple as:
    //
    // import query from '../somequery.gql';
    //
    // should be used with a proper GraphQL
    // library like @apollo/client.
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      use: [
        {
          loader: "graphql-tag/loader",
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
