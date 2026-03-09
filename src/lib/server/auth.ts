import { building } from '$app/environment';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';

function initAuth() {
	if (!env.BETTER_AUTH_SECRET) throw new Error('BETTER_AUTH_SECRET is not set');
	if (!env.ORIGIN) throw new Error('ORIGIN is not set');

	return betterAuth({
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, { provider: 'pg' }),
		emailAndPassword: { enabled: true },
		plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
	});
}

// During SvelteKit build, env vars are unavailable. At runtime, secrets are required.
export const auth = building ? (null! as ReturnType<typeof initAuth>) : initAuth();
