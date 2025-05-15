import clsx from 'clsx';
import type { ReactNode } from 'react';

type TableProps = {
  children: ReactNode;
  className?: string;
};

type TableHeaderProps = {
  children: ReactNode;
  className?: string;
};

type TableBodyProps = {
  children: ReactNode;
  className?: string;
  striped?: boolean;
};

type TableCellProps = {
  children: ReactNode;
  className?: string;
  colSpan?: number;
};

type TableRowProps = {
  children: ReactNode;
  className?: string;
};

type TableHeaderCellProps = {
  children: ReactNode;
  onClick?: () => void;
  sortIndicator?: ReactNode;
  className?: string;
};

export const Table: React.FC<TableProps> = ({ children, className }) => (
  <table className={clsx('min-w-full divide-y divide-gray-200', className)}>
    {children}
  </table>
);

export const Thead: React.FC<TableHeaderProps> = ({ children, className }) => (
  <thead className={clsx('bg-gray-200 sticky top-0', className)}>
    {children}
  </thead>
);

export const Tbody: React.FC<TableBodyProps> = ({
  children,
  className,
  striped = true,
}) => (
  <tbody
    className={clsx(
      'bg-white divide-y divide-gray-200',
      striped && '[&>tr:nth-child(even)]:bg-gray-50',
      className,
    )}
  >
    {children}
  </tbody>
);

export const Tr: React.FC<TableRowProps> = ({ children, className }) => (
  <tr className={clsx('hover:bg-gray-50', className)}>{children}</tr>
);

export const Td: React.FC<TableCellProps> = ({
  children,
  className,
  colSpan,
}) => (
  <td colSpan={colSpan} className={clsx('px-4 py-3 text-sm', className)}>
    {children}
  </td>
);

export const Th: React.FC<TableHeaderCellProps> = ({
  children,
  onClick,
  sortIndicator,
  className,
}) => (
  <th
    onClick={onClick}
    className={clsx(
      'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100',
      className,
    )}
  >
    {children} {sortIndicator}
  </th>
);
