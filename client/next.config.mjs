/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard/patient',
                permanent: true,
            },
            {
                source: '/dashboard',
                destination: '/dashboard/patient',
                permanent: true
            }
        ];
    },
};

export default nextConfig;
