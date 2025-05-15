# Playwright E2E Tests

This directory contains end-to-end tests using Playwright for the Orders Management application.

## Test Structure

- `order.spec.ts` - Main test suite for orders management functionality
- `mocks.ts` - Test data and mock objects
- `global-setup.ts` - Global setup for all tests

## Running Tests

```bash
# Run all tests
npm run e2e

# Run tests with UI
npm run e2e:ui

# Run tests in headed mode (visible browser)
npm run e2e:headed

# Run specific test file
npx playwright test order.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

## Test Features

The test suite covers:

1. **Initial Display** - Verifies the table loads with correct headers and data
2. **Sorting** - Tests sorting by OID and Days columns
3. **Filtering** - Tests single and multiple value filters
4. **Preset Management** - Tests saving and applying filter presets

## Configuration

Tests are configured in `playwright.config.ts` with:

- Base URL: `http://localhost:3005`
- Multiple browser support (Chrome, Firefox, Safari)
- Automatic dev server startup
- HTML reporter for test results
