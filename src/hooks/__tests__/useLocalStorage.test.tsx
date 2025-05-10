import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';
import { describe, it, expect, beforeEach } from 'vitest';

const TestComponent = ({
  keyName,
  initial,
  newValue,
}: {
  keyName: string;
  initial: string;
  newValue?: string;
}) => {
  const [value, setValue] = useLocalStorage(keyName, initial);

  useEffect(() => {
    if (newValue) setValue(newValue);
  }, [newValue, setValue]);

  return <div data-testid="output">{value}</div>;
};

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves initial value from localStorage if available', () => {
    localStorage.setItem('myKey', JSON.stringify('storedValue'));

    render(<TestComponent keyName="myKey" initial="defaultValue" />);
    expect(screen.getByTestId('output').textContent).toBe('storedValue');
  });

  it('uses the default value if localStorage is empty', () => {
    render(<TestComponent keyName="myKey" initial="defaultValue" />);
    expect(screen.getByTestId('output').textContent).toBe('defaultValue');
  });

  it('handles JSON parse errors gracefully', () => {
    localStorage.setItem('myKey', '{invalidJson}');
    render(<TestComponent keyName="myKey" initial="defaultValue" />);
    expect(screen.getByTestId('output').textContent).toBe('defaultValue');
  });

  it('updates localStorage when the state changes', () => {
    render(
      <TestComponent
        keyName="myKey"
        initial="defaultValue"
        newValue="newValue"
      />,
    );
    expect(screen.getByTestId('output').textContent).toBe('newValue');
    expect(localStorage.getItem('myKey')).toBe('"newValue"');
  });

  it('handles errors while setting localStorage', () => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('Storage error');
    };

    render(
      <TestComponent
        keyName="myKey"
        initial="defaultValue"
        newValue="newValue"
      />,
    );

    expect(screen.getByTestId('output').textContent).toBe('newValue');

    Storage.prototype.setItem = originalSetItem;
  });
});
