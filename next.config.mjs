/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1:3000"],

  images:{
     remotePatterns: [
      { protocol: "https", 
        hostname: "i.scdn.co", 
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
      }
    ],
   },
  }

export default nextConfig;
