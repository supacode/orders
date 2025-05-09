import { useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { useClickOutside } from '../../hooks/useClickOutside';

type AppPopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export const AppPopover: React.FC<AppPopoverProps> = ({
  trigger,
  children,
  className,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={clsx('relative', className)} ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-y-auto',
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
