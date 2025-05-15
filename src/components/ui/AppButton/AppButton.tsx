import {
  useCallback,
  type ReactNode,
  type ElementType,
  type KeyboardEvent,
} from 'react';
import clsx from 'clsx';

type AppButtonProps<C extends ElementType = 'button'> = {
  as?: C;
  onClick?: VoidFunction;
  children?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  variant?: 'solid' | 'ghost';
  color?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
} & React.ComponentPropsWithoutRef<C>;

export const AppButton = <C extends ElementType = 'button'>({
  as,
  onClick,
  children,
  startContent,
  endContent,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  className,
  ...rest
}: AppButtonProps<C>) => {
  const Component = as || 'button';
  const isNativeButton = Component === 'button';

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  const baseClasses =
    'flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 transition-colors';

  const sizeClasses = clsx({
    'px-2 py-1 text-xs': size === 'sm',
    'px-3 py-1.5 text-sm': size === 'md',
    'px-4 py-2 text-lg': size === 'lg',
  });

  const variantClasses = clsx({
    'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500':
      variant === 'solid' && color === 'primary',
    'text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400':
      variant === 'solid' && color === 'secondary',
    'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500':
      variant === 'solid' && color === 'danger',

    'bg-transparent': variant === 'ghost',
    'text-blue-600 hover:bg-blue-50 focus:ring-blue-500':
      variant === 'ghost' && color === 'primary',
    'text-gray-800 hover:bg-gray-100 focus:ring-gray-400':
      variant === 'ghost' && color === 'secondary',
    'text-red-600 hover:bg-red-50 focus:ring-red-500':
      variant === 'ghost' && color === 'danger',
  });

  const combinedClasses = clsx(
    baseClasses,
    sizeClasses,
    variantClasses,
    className,
  );

  return (
    <Component
      onClick={handleClick}
      onKeyDown={!isNativeButton ? handleKeyDown : undefined}
      role={!isNativeButton ? 'button' : undefined}
      tabIndex={!isNativeButton ? 0 : undefined}
      className={combinedClasses}
      {...rest}
    >
      {startContent}
      {children}
      {endContent}
    </Component>
  );
};
