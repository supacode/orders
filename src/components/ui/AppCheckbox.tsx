import type { ChangeEventHandler } from 'react';
import clsx from 'clsx';

type AppCheckboxProps = {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  color?: 'primary';
  disabled?: boolean;
};

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  label,
  checked,
  onChange,
  description,
  disabled,
  color = 'primary',
}) => {
  const baseClasses =
    'text-sm flex rounded-lg items-center gap-2 cursor-pointer';

  const colorClasses = clsx({
    'border-blue-600 hover:border-blue-700 focus:ring-blue-500':
      color === 'primary',
  });

  return (
    <label className={clsx(baseClasses)}>
      {/* Checkbox input with dynamic color applied only to the input itself */}
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={clsx(
          'w-4 h-4 rounded border-2 focus:ring-2 transition-colors',
          colorClasses,
        )}
        aria-checked={checked}
        aria-labelledby={label ? label : undefined}
        aria-describedby={description ? description : undefined}
      />

      {label && <span id={label}>{label}</span>}

      {description && <span id={description}>{description}</span>}
    </label>
  );
};
