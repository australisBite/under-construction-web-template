import { building } from '$app/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

function initDb() {
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
	return drizzle(postgres(env.DATABASE_URL), { schema });
}

// During SvelteKit build, env vars are unavailable. At runtime, DATABASE_URL is required.
export const db = building ? (null! as ReturnType<typeof initDb>) : initDb();
