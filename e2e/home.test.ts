import { expect, test } from '@playwright/test';

test.describe('Landing Page E2E (Audit 2026)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should render the main title correctly', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Website');
        await expect(page.locator('h2')).toContainText('under construction');
    });

    test('should have a visible Three.js canvas for the particle field', async ({ page }) => {
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();
        
        // Verify canvas size is responsive
        const box = await canvas.boundingBox();
        expect(box?.width).toBeGreaterThan(0);
        expect(box?.height).toBeGreaterThan(0);
    });

    test('should toggle theme and apply correct CSS classes', async ({ page }) => {
        const html = page.locator('html');
        const toggleBtn = page.getByRole('button', { name: /toggle theme/i });

        // Initial state (default light)
        await expect(html).not.toHaveClass(/dark/);

        // Click to Dark Mode
        await toggleBtn.click();
        await expect(html).toHaveClass(/dark/);
        
        // Background color check (computed)
        const bgColor = await html.evaluate((el) => getComputedStyle(el).getPropertyValue('--bg-color').trim());
        expect(bgColor).toBe('#0a0a0a');

        // Click back to Light Mode
        await toggleBtn.click();
        await expect(html).not.toHaveClass(/dark/);
    });

    test('should render both illustrations', async ({ page }) => {
        await expect(page.locator('#man')).toBeVisible();
        await expect(page.locator('#dog')).toBeVisible();
    });

    test('CSP should not block critical scripts', async ({ page }) => {
        const logs: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') logs.push(msg.text());
        });

        await page.reload({ waitUntil: 'networkidle' });
        
        // Verify no CSP errors in console
        const cspErrors = logs.filter(log => log.toLowerCase().includes('content security policy'));
        if (cspErrors.length > 0) {
            console.log('Detected CSP Errors:', cspErrors);
        }
        expect(cspErrors.length).toBe(0);
    });
});
