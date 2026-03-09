import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL || 'postgres://localhost/db_placeholder';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url },
	verbose: true,
	strict: true
});
