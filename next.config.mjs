/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/weather-app',
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

export default nextConfig;
