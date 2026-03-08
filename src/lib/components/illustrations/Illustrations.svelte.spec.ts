import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import ManIllustration from './ManIllustration.svelte';
import DogIllustration from '$lib/components/illustrations/DogIllustration.svelte';

test('ManIllustration renders SVG', () => {
    render(ManIllustration);
    const svgs = screen.getAllByRole('img');
    expect(svgs.length).toBeGreaterThan(0);
});

test('DogIllustration renders SVG', () => {
    render(DogIllustration);
    const svgs = screen.getAllByRole('img');
    expect(svgs.length).toBeGreaterThan(0);
});
