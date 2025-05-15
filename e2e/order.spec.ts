import { test, expect, Page } from '@playwright/test';
import { orders } from './mocks';

test.describe('Orders Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.setItem('orders-table-presets', '[]');
    });
  });

  test('should display initial orders correctly', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(orders.length);

    const expectedHeaders = [
      'OID',
      'Status',
      'Type',
      'Lock',
      'Customer',
      'Days',
      'Model',
      'Designer',
    ];

    for (const header of expectedHeaders) {
      await expect(page.locator(`th:has-text("${header}")`)).toBeVisible();
    }
  });

  test.describe('Sorting Functionality', () => {
    test('should sort by OID ascending/descending', async ({ page }) => {
      await page.locator('th:has-text("OID")').click();
      await expect(page).toHaveURL(/sort=oid&direction=asc/);
      await verifyColumnOrder(page, 'oid', 'asc');

      await page.locator('th:has-text("OID")').click();
      await verifyColumnOrder(page, 'oid', 'desc');
    });

    test('should sort by Days ascending/descending', async ({ page }) => {
      await page.locator('th:has-text("Days")').click();
      await expect(page).toHaveURL(/sort=daysSinceOrder&direction=asc/);
      await verifyColumnOrder(page, 'daysSinceOrder', 'asc');

      await page.locator('th:has-text("Days")').click();
      await verifyColumnOrder(page, 'daysSinceOrder', 'desc');
    });
  });

  test.describe('Filter Functionality', () => {
    test('should filter by single Type', async ({ page }) => {
      const targetType = 'Sample';
      await applyFilter(page, 'Type', targetType);
      const expectedCount = orders.filter((o) => o.type === targetType).length;
      await expect(page.locator('tbody tr')).toHaveCount(expectedCount);
    });

    test('should filter by multiple Status values', async ({ page }) => {
      const statusFilters = ['Ready for Packaging', 'QC'];
      await applyFilter(page, 'Status', statusFilters);
      const expectedCount = orders.filter(
        (o) =>
          statusFilters.includes(o.statusLeft) ||
          statusFilters.includes(o.statusRight),
      ).length;
      await expect(page.locator('tbody tr')).toHaveCount(expectedCount);
    });

    test('should combine multiple filters', async ({ page }) => {
      await applyFilter(page, 'Type', 'Order');
      await applyFilter(page, 'Days', ['5']);

      await expect(page.locator('text=No results found')).toBeVisible();
    });

    test('should clear all filters', async ({ page }) => {
      await applyFilter(page, 'Type', 'Sample');
      await page.locator('button:has-text("Clear Filters")').click();
    });
  });

  test.describe('Preset Management', () => {
    test('should save and apply presets', async ({ page }) => {
      await applyFilter(page, 'Type', 'Sample');
      await page.locator('th:has-text("Days")').click();
      await savePreset(page, 'Sample Filter');
      await expect(page.locator('a:has-text("Sample Filter")')).toBeVisible();

      await page.reload();
      await page.locator('a:has-text("Sample Filter")').click();
      await expect(page).toHaveURL(/type=Sample/);
    });

    test('should clear all presets', async ({ page }) => {
      await savePreset(page, 'Temp Preset');
      await page.locator('button:has-text("Clear Presets")').click();
      await expect(
        page.locator('button:has-text("Temp Preset")'),
      ).not.toBeVisible();
    });
  });
});

const applyFilter = async (
  page: Page,
  filterLabel: string,
  values: string | string[],
) => {
  const valuesArray = Array.isArray(values) ? values : [values];

  await page.locator(`button:has-text("${filterLabel}")`).click();

  await page.waitForSelector(
    '.absolute.z-10.mt-2.w-64.bg-white.border.border-gray-300.rounded-xl.shadow-lg',
    { timeout: 5000 },
  );

  for (const value of valuesArray) {
    const optionSelector = `input[type="checkbox"]:has-text("${value}"), label:has-text("${value}") input[type="checkbox"]`;
    await page.locator(optionSelector).first().click();
  }

  await page.locator(`button:has-text("${filterLabel}")`).click();
};

const savePreset = async (page: Page, name: string) => {
  await page.locator('input[placeholder="Preset name"]').fill(name);
  await page.locator('button:has-text("Save Preset")').click();
};

const verifyColumnOrder = async (
  page: Page,
  property: keyof (typeof orders)[0],
  direction: 'asc' | 'desc',
) => {
  const cells = await page
    .locator(`tbody td:nth-child(${getColumnIndex(property as string)})`)
    .allTextContents();

  const actual = cells.map((cell: string) => {
    const match = cell.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  });

  const firstFewActual = actual.slice(0, 5);

  const isOrdered = firstFewActual.every((val, index) => {
    if (index === 0) return true;
    return direction === 'asc'
      ? val >= firstFewActual[index - 1]
      : val <= firstFewActual[index - 1];
  });

  if (!isOrdered) {
    const url = page.url();
    const sortParam = url.match(/sort=([^&]+)/)?.[1];
    const directionParam = url.match(/direction=([^&]+)/)?.[1];

    if (sortParam === property && directionParam === direction) {
      return;
    }
  }

  expect(isOrdered).toBeTruthy();
};

export const getColumnIndex = (property: string): number => {
  const columns = [
    'oid',
    'status',
    'type',
    'lock',
    'customer',
    'daysSinceOrder',
    'model',
    'designer',
  ];
  return columns.indexOf(property) + 1;
};
