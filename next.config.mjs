/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production'

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
const nextAuthUrl = isProduction ? process.env.NEXTAUTH_URL_PRODUCTION : process.env.NEXTAUTH_URL;

const postgresUrl = process.env.POSTGRES_URL;

const accessToken = process.env.ACCESS_TOKEN;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const nextConfig = {
    env: {
        NEXTAUTH_SECRET: nextAuthSecret,
        NEXTAUTH_URL: nextAuthUrl,
        POSTGRES_URL: postgresUrl,
        ACCESS_TOKEN: accessToken,
        ADMIN_EMAIL: adminEmail,
        ADMIN_PASSWORD: adminPassword,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
