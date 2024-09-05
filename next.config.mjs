/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rbbgbgxphepubvmxmsnd.supabase.co'
      }
    ]
  }
}

export default nextConfig
