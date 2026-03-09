import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Durante el build de SvelteKit, las variables de entorno dinámicas pueden no estar disponibles.
// Usamos una cadena vacía o un valor por defecto para evitar que el proceso falle.
const connectionString = env.DATABASE_URL || 'postgres://localhost/db_placeholder';

const client = postgres(connectionString);

export const db = drizzle(client, { schema });
