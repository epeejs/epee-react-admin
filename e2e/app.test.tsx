import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test.describe('App', () => {
  test('展开菜单', async ({ page }) => {
    const element = page.locator('.ant-menu-submenu', {
      hasText: '列表页',
    });
    await element.click();
    await expect(element).toHaveClass(/ant-menu-submenu-open/);
  });
});
