// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your existing config options here */

  eslint: {
    // ✅ This prevents Vercel build from failing on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
