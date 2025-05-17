# Orders Management Dashboard

A responsive, filterable, and sortable dashboard for order management with preset functionality.

## Installation

```bash
git clone orders
cd orders
npm install
```

## Development

### Start development server (port 3005)

```bash
npm start
```

### Run unit tests

```bash
npm test
```

### Run end-to-end tests (Playwright)

```bash
# Run all E2E tests
npm run e2e

# Run E2E tests with UI mode
npm run e2e:ui

# Run E2E tests in headed mode
npm run e2e:headed
```

### Storybook

```bash
# Start Storybook development server (port 6006)
npm run storybook
```

### Linting

```bash
npm run lint
```

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Testing

This project uses multiple testing frameworks:

- **Unit Tests**: Vitest with React Testing Library
- **E2E Tests**: Playwright for end-to-end testing
- **Component Testing**: Storybook with addons for accessibility and documentation

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Playwright (E2E testing)
- Storybook (Component development)
- Vitest (Unit testing)
