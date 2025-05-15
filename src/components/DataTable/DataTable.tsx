import { useCallback, useMemo, type ReactNode } from 'react';
import { decodeParam } from '../../utils/decodeParam';
import { compareValues } from '../../utils/compareValues';
import { AppButton } from '../ui/AppButton';
import { OrdersTableFilter } from '../../features/orders/OrdersTableFilter';
import * as Table from '../ui/AppTable';
import { encodeParam } from '../../utils/encodeParam';

export type ColumnDef<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  sortKey?: keyof T;
};

export type FilterConfig<T> = {
  key: string;
  label: string;
  getFilterValues: (item: T) => (string | number)[];
  parse?: (value: string) => string | number;
};

export const DataTable = <T,>({
  data,
  columns,
  filterConfigs,
  searchParams,
  setSearchParams,
  rowKey,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  filterConfigs: FilterConfig<T>[];
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  rowKey: (item: T) => string | number;
}) => {
  const filters = useMemo(() => {
    const params: Record<string, (string | number)[]> = {};
    filterConfigs.forEach((config) => {
      const values = searchParams.getAll(config.key).map((value) => {
        const decoded = decodeParam(value);
        return config.parse ? config.parse(decoded) : decoded;
      });
      params[config.key] = values;
    });

    return params;
  }, [filterConfigs, searchParams]);

  const sortConfig = useMemo(
    () => ({
      key: searchParams.get('sort') as keyof T | null,
      direction: (searchParams.get('direction') as 'asc' | 'desc') || 'asc',
    }),
    [searchParams],
  );

  const filterOptions = useMemo(() => {
    const options: Record<string, (string | number)[]> = {};
    filterConfigs.forEach((config) => {
      const uniqueValues = new Set<string | number>();
      data.forEach((item) => {
        config
          .getFilterValues(item)
          .forEach((value) => uniqueValues.add(value));
      });
      options[config.key] = Array.from(uniqueValues);
    });
    return options;
  }, [data, filterConfigs]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      filterConfigs.every((config) => {
        const selected = filters[config.key] || [];
        if (selected.length === 0) return true;

        const itemValues = config.getFilterValues(item);
        return itemValues.some((value) => selected.includes(value));
      }),
    );
  }, [data, filters, filterConfigs]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      return sortConfig.direction === 'asc'
        ? compareValues(aValue, bValue)
        : compareValues(bValue, aValue);
    });
  }, [filteredData, sortConfig]);

  const handleFilterChange = useCallback(
    (key: string, values: (string | number)[]) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      values.forEach((val) =>
        newParams.append(key, encodeParam(val.toString())),
      );
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handleSort = useCallback(
    (key: keyof T) => {
      const newParams = new URLSearchParams(searchParams);
      const direction =
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc';

      newParams.set('sort', key.toString());
      newParams.set('direction', direction);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams, sortConfig],
  );

  const clearAllFilters = useCallback(() => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((arr) => arr.length > 0),
    [filters],
  );

  const getSortIndicator = (key: keyof T | undefined) => {
    if (!key) return null;
    return sortConfig.key === key
      ? sortConfig.direction === 'asc'
        ? '↑'
        : '↓'
      : null;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {filterConfigs.map((config) => (
          <OrdersTableFilter
            key={config.key}
            label={config.label}
            options={filterOptions[config.key]}
            selected={filters[config.key] || []}
            onChange={(values) => handleFilterChange(config.key, values)}
          />
        ))}

        {hasActiveFilters && (
          <AppButton variant="ghost" color="danger" onClick={clearAllFilters}>
            Clear Filters
          </AppButton>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <Table.Table>
          <Table.Thead>
            <Table.Tr>
              {columns.map((column) => (
                <Table.Th
                  key={column.key}
                  onClick={() => column.sortKey && handleSort(column.sortKey)}
                  className={
                    column.sortKey ? 'cursor-pointer hover:bg-gray-100' : ''
                  }
                >
                  {column.header} {getSortIndicator(column.sortKey)}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <Table.Tr key={rowKey(item)}>
                  {columns.map((column) => (
                    <Table.Td key={column.key}>{column.render(item)}</Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>No results found</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table.Table>
      </div>
    </div>
  );
};
