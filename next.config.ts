import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'dummyimage.com',
				port: '',
				pathname: '/**',
			},
		],
	},

	devIndicators: false,
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@/pages': path.resolve(process.cwd(), 'src/pages'),
			'@/widgets': path.resolve(process.cwd(), 'src/widgets'),
			'@/features': path.resolve(process.cwd(), 'src/features'),
			'@/entities': path.resolve(process.cwd(), 'src/entities'),
			'@/shared': path.resolve(process.cwd(), 'src/shared'),
			'@/styles': path.resolve(process.cwd(), 'src/shared/styles'),
		};
		return config;
	},
};

export default nextConfig;
