/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Mark keystatic as external package for serverless
  serverExternalPackages: ['@keystatic/core'],
  // Include content files in Vercel's output file tracing
  outputFileTracingIncludes: {
    '/*': ['./content/**/*'],
  },
}

export default nextConfig
