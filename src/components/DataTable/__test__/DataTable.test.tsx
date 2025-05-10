import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable, type ColumnDef, type FilterConfig } from '../DataTable';

const sampleData = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 2 },
  { id: 2, name: 'Broccoli', category: 'Vegetable', price: 3 },
  { id: 3, name: 'Carrot', category: 'Vegetable', price: 1 },
];

type Sample = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type Test = ColumnDef<Sample>;

const columns: Test[] = [
  {
    key: 'name',
    header: 'Name',
    render: (item) => item.name,
    sortKey: 'name',
  },
  {
    key: 'category',
    header: 'Category',
    render: (item) => item.category,
  },
];

const filterConfigs: FilterConfig<Sample>[] = [
  {
    key: 'category',
    label: 'Category',
    getFilterValues: (item) => [item.category],
  },
];

describe('DataTable', () => {
  let searchParams: URLSearchParams;
  let setSearchParams: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    searchParams = new URLSearchParams();
    setSearchParams = vi.fn();
  });

  it('renders table headers and rows', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterConfigs={filterConfigs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        rowKey={(item) => item.id}
      />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', { name: 'Category' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
  });

  it('displays empty state when no data matches filters', () => {
    searchParams.set('category', 'Meat');

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterConfigs={filterConfigs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        rowKey={(item) => item.id}
      />,
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('invokes setSearchParams when a sortable header is clicked', () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterConfigs={filterConfigs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        rowKey={(item) => item.id}
      />,
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    expect(setSearchParams).toHaveBeenCalled();
  });

  it('displays ascending sort indicator when sort is set to asc', () => {
    searchParams.set('sort', 'name');
    searchParams.set('direction', 'asc');

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterConfigs={filterConfigs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        rowKey={(item) => item.id}
      />,
    );

    expect(screen.getByText(/Name/).textContent).toMatch(/↑/);
  });

  it('displays descending sort indicator when sort is set to desc', () => {
    searchParams.set('sort', 'name');
    searchParams.set('direction', 'desc');

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterConfigs={filterConfigs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        rowKey={(item) => item.id}
      />,
    );

    expect(screen.getByText(/Name/).textContent).toMatch(/↓/);
  });
});
