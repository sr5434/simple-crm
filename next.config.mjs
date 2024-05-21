/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        autoPrerender: false,
    },
    serverRuntimeConfig: {
        host: '0.0.0.0',
    },
};

export default nextConfig;
