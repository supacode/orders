import { useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Order } from './types';
import { orders } from './data';

import { DataTable } from '../../components/DataTable/DataTable';
import { OrdersPreset } from './OrdersPreset';

type ColumnDef<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  sortKey?: keyof T;
};

type FilterConfig<T> = {
  key: string;
  label: string;
  getFilterValues: (item: T) => (string | number)[];
  parse?: (value: string) => string | number;
};

export const OrdersContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterConfigs: FilterConfig<Order>[] = useMemo(
    () => [
      {
        key: 'status',
        label: 'Status',
        getFilterValues: (order) => [order.statusLeft, order.statusRight],
      },
      {
        key: 'type',
        label: 'Type',
        getFilterValues: (order) => [order.type],
      },
      {
        key: 'lock',
        label: 'Lock',
        getFilterValues: (order) => [order.lock || 'No Lock'],
      },
      {
        key: 'customer',
        label: 'Customer',
        getFilterValues: (order) => [order.customer],
      },
      {
        key: 'daysSinceOrder',
        label: 'Days',
        getFilterValues: (order) => [order.daysSinceOrder],
        parse: (value) => parseInt(value, 10),
      },
      {
        key: 'model',
        label: 'Model',
        getFilterValues: (order) => [order.model],
      },
      {
        key: 'designer',
        label: 'Designer',
        getFilterValues: (order) => [order.designer],
      },
    ],
    [],
  );

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        key: 'oid',
        header: 'OID',
        render: (order) => order.oid,
        sortKey: 'oid',
      },
      {
        key: 'status',
        header: 'Status',
        render: (order) => (
          <div className="flex gap-2">
            <span>L: {order.statusLeft}</span>
            <span>|</span>
            <span>R: {order.statusRight}</span>
          </div>
        ),
        sortKey: 'statusLeft',
      },
      {
        key: 'type',
        header: 'Type',
        render: (order) => order.type,
        sortKey: 'type',
      },
      {
        key: 'lock',
        header: 'Lock',
        render: (order) => order.lock || '—',
        sortKey: 'lock',
      },
      {
        key: 'customer',
        header: 'Customer',
        render: (order) => order.customer,
        sortKey: 'customer',
      },
      {
        key: 'daysSinceOrder',
        header: 'Days',
        render: (order) => order.daysSinceOrder,
        sortKey: 'daysSinceOrder',
      },
      {
        key: 'model',
        header: 'Model',
        render: (order) => order.model,
        sortKey: 'model',
      },
      {
        key: 'designer',
        header: 'Designer',
        render: (order) => order.designer,
        sortKey: 'designer',
      },
    ],
    [],
  );

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <OrdersPreset searchParams={searchParams} />

      <DataTable<Order>
        data={orders}
        columns={columns}
        filterConfigs={filterConfigs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        rowKey={(order) => order.oid}
      />
    </div>
  );
};
