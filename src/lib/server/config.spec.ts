import { describe, it, expect, vi } from 'vitest';
import { env } from '$env/dynamic/private';
import { auth } from './auth';
import { db } from './db';

describe('Configuración de Entorno y Base de Datos', () => {
	it('debería tener las variables de Supabase configuradas en el .env', () => {
		expect(env.DATABASE_URL).toBeDefined();
		expect(env.DATABASE_URL).toContain('supabase.com');
		expect(env.DATABASE_URL).toContain('6543'); // Verificar que usa el Pooler
	});

	it('debería tener las variables de Better Auth configuradas', () => {
		expect(env.BETTER_AUTH_SECRET).toBeDefined();
		expect(env.BETTER_AUTH_SECRET?.length).toBeGreaterThanOrEqual(32);
		expect(env.ORIGIN).toBeDefined();
	});

	it('el objeto db debería estar inicializado correctamente', () => {
		expect(db).toBeDefined();
		// Verificamos que no sea el placeholder si las variables están presentes
		if (env.DATABASE_URL) {
			expect(db).not.toBeNull();
		}
	});

	it('el objeto auth debería estar configurado con la base de datos', () => {
		expect(auth).toBeDefined();
		expect(auth.options.baseURL).toBe(env.ORIGIN || 'http://localhost:5173');
	});
});
