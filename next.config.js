/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const path = require('path')

const imgLoader = () => {
  const loader = process.env.NEXT_PUBLIC_LOADER || 'default';
  if (loader === "default") {
    return {
      loader: "default"
    }
  } else {
    return {
      loader: loader,
      path: "https://brainhack-western.imgix.net/"
    }
  }
}

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'node_modules')
    ]
  },
  images: imgLoader(),
  basePath: process.env.NEXT_PUBLIC_URL,
  assetPrefix: process.env.NEXT_PUBLIC_URL,
}
