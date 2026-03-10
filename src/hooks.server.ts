import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Cabeceras de seguridad recomendadas (CSP se gestiona ahora en svelte.config.js)
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	if (!building) {
		response.headers.set(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains; preload'
		);
	}

	return response;
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const handleFaviconRedirect: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// Redirigir peticiones automáticas de navegadores y crawlers para evitar 404
	if (pathname === '/favicon.png' || pathname === '/favicon.ico') {
		return new Response(null, {
			status: 302,
			headers: { location: '/favicon.svg' }
		});
	}

	return resolve(event);
};

export const handle: Handle = sequence(
	handleFaviconRedirect,
	handleSecurityHeaders,
	handleBetterAuth
);
