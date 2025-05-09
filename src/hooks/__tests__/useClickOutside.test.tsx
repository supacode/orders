import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';
import { useRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

const TestComponent = ({ onOutsideClick }: { onOutsideClick: () => void }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, onOutsideClick);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe('useClickOutside', () => {
  it('calls handler when clicking outside the element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onOutsideClick={handler} />);

    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does NOT call handler when clicking inside the element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent onOutsideClick={handler} />);

    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });
});
