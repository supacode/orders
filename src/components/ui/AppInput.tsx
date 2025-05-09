import { type ChangeEventHandler, type HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';

type AppInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  label?: string;
  error?: string;
  required?: boolean;
};

export const AppInput: React.FC<AppInputProps> = ({
  value,
  onChange,
  placeholder,
  size = 'md',
  type = 'text',
  disabled = false,
  label,
  error,
  required = false,
}) => {
  const baseClasses =
    'rounded-xl focus:outline-none ring-1 ring-gray-300 focus:ring-1 transition-all duration-200';

  const sizeClasses = clsx({
    'text-sm px-2 py-1': size === 'sm',
    'text-base px-4 py-2': size === 'md',
    'text-lg px-6 py-3': size === 'lg',
  });

  const primaryClasses = 'text-black focus:ring-blue-500';

  const combinedClasses = clsx(baseClasses, sizeClasses, primaryClasses);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={label}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
        aria-describedby={error ? `${label}-error` : undefined}
        aria-required={required}
        aria-invalid={!!error}
        className={combinedClasses}
      />
      {error && (
        <p id={`${label}-error`} className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
