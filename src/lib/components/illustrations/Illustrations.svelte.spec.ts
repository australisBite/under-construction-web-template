import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import AstronautIllustration from './AstronautIllustration.svelte';

test('AstronautIllustration renders image', () => {
    render(AstronautIllustration);
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThan(0);
});
