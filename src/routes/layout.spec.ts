import { describe, expect, it, vi } from 'vitest';

vi.mock('@vercel/analytics/sveltekit', () => ({
	injectAnalytics: vi.fn()
}));

describe('+layout.ts', () => {
	it('should call injectAnalytics with correct mode', async () => {
		const { injectAnalytics } = await import('@vercel/analytics/sveltekit');
		await import('./+layout');

		expect(injectAnalytics).toHaveBeenCalledWith({
			mode: expect.stringMatching(/^(development|production)$/)
		});
	});
});
