/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export -> deploy anywhere free (Vercel/GitHub Pages/Netlify). No server.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
