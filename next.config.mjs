/** @type {import('next').NextConfig} */

const postgresUrl = process.env.POSTGRES_URL
// const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
    env: {
        POSTGRES_URL: postgresUrl
    }
};

export default nextConfig;
