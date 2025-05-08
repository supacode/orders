import { render, screen, fireEvent } from '@testing-library/react';
import { AppButton } from '../AppButton';
import { describe, it, expect, vi } from 'vitest';

describe('AppButton', () => {
  it('renders children and can be selected by aria-label', () => {
    render(<AppButton aria-label="click-me">Click me</AppButton>);
    const button = screen.getByRole('button', { name: 'click-me' });
    expect(button).toBeInTheDocument();
  });

  it('renders startContent and endContent correctly', () => {
    render(
      <AppButton
        aria-label="content-button"
        startContent={<span>Start</span>}
        endContent={<span>End</span>}
      >
        Content
      </AppButton>,
    );

    const button = screen.getByRole('button', { name: 'content-button' });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('handles onClick properly', () => {
    const handleClick = vi.fn();
    render(
      <AppButton onClick={handleClick} aria-label="click-me-button">
        Click me
      </AppButton>,
    );

    const button = screen.getByRole('button', { name: 'click-me-button' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct classes based on props', () => {
    const { rerender } = render(
      <AppButton
        variant="solid"
        color="primary"
        size="md"
        aria-label="styled-button"
      >
        Button
      </AppButton>,
    );

    const button = screen.getByRole('button', { name: 'styled-button' });
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('px-3 py-1.5 text-sm');

    rerender(
      <AppButton
        variant="ghost"
        color="secondary"
        size="lg"
        aria-label="styled-button"
      >
        Button
      </AppButton>,
    );

    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('text-gray-800');
    expect(button).toHaveClass('px-4 py-2 text-lg');
  });

  it('renders custom element using "as" prop', () => {
    const { container } = render(
      <AppButton as="a" href="#" aria-label="link-button">
        Link
      </AppButton>,
    );
    const link = screen.getByRole('button', { name: 'link-button' });

    expect(container.querySelector('a')).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });

  it('applies custom className if provided', () => {
    render(
      <AppButton className="custom-class" aria-label="custom-button">
        Button
      </AppButton>,
    );
    const button = screen.getByRole('button', { name: 'custom-button' });
    expect(button).toHaveClass('custom-class');
  });
});
