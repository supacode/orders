import { render, screen, fireEvent } from '@testing-library/react';
import { AppInput } from './AppInput';
import { describe, it, expect, vi } from 'vitest';

describe('AppInput', () => {
  it('renders input with a label', () => {
    render(<AppInput label="Username" value="" onChange={vi.fn()} />);

    const input = screen.getByLabelText(/Username/i);
    expect(input).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    render(
      <AppInput
        label="Username"
        value=""
        onChange={vi.fn()}
        placeholder="Enter your username"
      />,
    );

    const input = screen.getByPlaceholderText(/Enter your username/i);
    expect(input).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(<AppInput label="Username" value="" onChange={handleChange} />);

    const input = screen.getByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: 'JohnDoe' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders error message when there is an error', () => {
    render(
      <AppInput
        label="Username"
        value=""
        onChange={vi.fn()}
        error="Username is required"
      />,
    );

    const errorMessage = screen.getByText(/Username is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('sets aria-invalid to true when there is an error', () => {
    render(
      <AppInput
        label="Username"
        value=""
        onChange={vi.fn()}
        error="Username is required"
      />,
    );

    const input = screen.getByLabelText(/Username/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the input when disabled prop is true', () => {
    render(<AppInput label="Username" value="" onChange={vi.fn()} disabled />);

    const input = screen.getByLabelText(/Username/i);
    expect(input).toBeDisabled();
  });

  it('renders required asterisk when required prop is true', () => {
    render(<AppInput label="Username" value="" onChange={vi.fn()} required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
  });
});
