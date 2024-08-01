/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|ogv|mp3)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000, // Adjust the limit as needed
                    fallback: 'file-loader',
                    name: '[name].[hash].[ext]',
                },
            },
        });

        return config;
    },
};

export default nextConfig;
