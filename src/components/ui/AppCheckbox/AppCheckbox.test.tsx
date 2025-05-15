import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppCheckbox } from './AppCheckbox';
import { describe, it, expect, vi } from 'vitest';

describe('AppCheckbox', () => {
  it('renders checkbox with label and description', () => {
    render(
      <AppCheckbox
        label="Accept Terms"
        description="Please accept the terms and conditions"
        checked={false}
        onChange={vi.fn()}
      />,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /Accept Terms/i,
    });
    const description = screen.getByText(
      /Please accept the terms and conditions/i,
    );

    expect(checkbox).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('toggles checkbox when clicked', () => {
    const Wrapper = () => {
      const [checked, setChecked] = useState(false);
      return (
        <AppCheckbox
          label="Accept Terms"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };

    render(<Wrapper />);

    const checkbox = screen.getByRole('checkbox', {
      name: /Accept Terms/i,
    });

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('applies correct ARIA attributes when checked', () => {
    render(
      <AppCheckbox label="Accept Terms" checked={true} onChange={vi.fn()} />,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /Accept Terms/i,
    });
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('applies the correct classes based on props', () => {
    const { rerender } = render(
      <AppCheckbox
        label="Accept Terms"
        checked={false}
        onChange={vi.fn()}
        color="primary"
      />,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /Accept Terms/i,
    });

    expect(checkbox).toHaveClass('border-blue-600');

    rerender(
      <AppCheckbox
        label="Accept Terms"
        checked={true}
        onChange={vi.fn()}
        color="primary"
      />,
    );

    expect(checkbox).toHaveClass('border-blue-600');
  });

  it('renders the checkbox with the correct description', () => {
    render(
      <AppCheckbox
        label="Accept Terms"
        description="Please accept the terms and conditions"
        checked={false}
        onChange={vi.fn()}
      />,
    );

    const description = screen.getByText(
      /Please accept the terms and conditions/i,
    );
    expect(description).toBeInTheDocument();
  });

  it('can be disabled and is not interactable', () => {
    render(
      <AppCheckbox
        label="Accept Terms"
        checked={false}
        onChange={vi.fn()}
        disabled
      />,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /Accept Terms/i,
    });

    expect(checkbox).toBeDisabled();
  });
});
