import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Avoid Next Dev Tools badge drag logic — it can throw releasePointerCapture NotFoundError in the terminal/browser console during dev. */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/eizd2ue5a/**",
      },
    ],
  },
};

export default nextConfig;
