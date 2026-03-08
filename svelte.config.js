import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ['self'],
				'object-src': ['none'],
				'base-uri': ['self'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'img-src': ['self', 'data:', 'blob:'],
				'connect-src': ['self'],
				'worker-src': ['self', 'blob:']
			}
		}
	}
};

export default config;
