import webpack from "webpack";

import { initCanisterIds } from "./dfx.webpack.config.mjs";

initCanisterIds();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    config.plugins.push(new webpack.EnvironmentPlugin(['DFX_NETWORK'])); // only if you want to expose DFX_NETWORK

    return config;
  },
  output: "export"
};

export default nextConfig;