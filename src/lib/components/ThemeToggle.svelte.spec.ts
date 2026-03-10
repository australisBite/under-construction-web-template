import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';
import { theme } from '$lib/stores/theme.svelte';

test('ThemeToggle switches theme on click', async () => {
	render(ThemeToggle);

	const button = screen.getByRole('button', { name: /toggle theme/i });

	// Initial state (assuming light for this test environment)
	theme.value = 'light';
	expect(screen.getByText('dark_mode')).toBeTruthy();

	await fireEvent.click(button);

	expect(theme.value).toBe('dark');
	// In Svelte 5, the UI should update reactively
	expect(screen.getByText('light_mode')).toBeTruthy();
});
