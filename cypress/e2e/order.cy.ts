/// <reference types="cypress" />
import { orders } from './mocks';

describe('Orders Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3005');
    window.localStorage.setItem('orders-table-presets', '[]');
  });

  it('should display initial orders correctly', () => {
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length', orders.length);

    const expectedHeaders = [
      'OID',
      'Status',
      'Type',
      'Lock',
      'Customer',
      'Days',
      'Model',
      'Designer',
    ];
    expectedHeaders.forEach((header) => {
      cy.contains('th', header).should('exist');
    });
  });

  describe('Sorting Functionality', () => {
    it('should sort by OID ascending/descending', () => {
      cy.contains('th', 'OID').click();
      cy.url().should('include', 'sort=oid&direction=asc');
      verifyColumnOrder('oid', 'asc');

      cy.contains('th', 'OID').click();

      verifyColumnOrder('oid', 'desc');
    });

    it('should sort by Days ascending/descending', () => {
      cy.contains('th', 'Days').click();
      cy.url().should('include', 'sort=daysSinceOrder&direction=asc');
      verifyColumnOrder('daysSinceOrder', 'asc');

      cy.contains('th', 'Days').click();

      verifyColumnOrder('daysSinceOrder', 'desc');
    });
  });

  describe('Filter Functionality', () => {
    it('should filter by single Type', () => {
      const targetType = 'Sample';
      applyFilter('Type', targetType);
      const expectedCount = orders.filter((o) => o.type === targetType).length;
      cy.get('tbody tr').should('have.length', expectedCount);
    });

    it('should filter by multiple Status values', () => {
      const statusFilters = ['Ready for Packaging', 'QC'];
      applyFilter('Status', statusFilters);
      const expectedCount = orders.filter(
        (o) =>
          statusFilters.includes(o.statusLeft) ||
          statusFilters.includes(o.statusRight),
      ).length;
      cy.get('tbody tr').should('have.length', expectedCount);
    });
    it('should combine multiple filters', () => {
      applyFilter('Type', 'Order');
      applyFilter('Days', ['5']);

      cy.contains('No results found').should('exist');
    });
    it('should clear all filters', () => {
      applyFilter('Type', 'Sample');
      cy.contains('button', 'Clear Filters').click();
    });
  });

  describe('Preset Management', () => {
    it('should save and apply presets', () => {
      applyFilter('Type', 'Sample');
      cy.contains('th', 'Days').click();
      savePreset('Sample Filter');
      cy.contains('a', 'Sample Filter').should('exist');
      cy.reload();
      cy.contains('a', 'Sample Filter').click();
      cy.url().should('include', 'type=Sample');
    });
    it('should clear all presets', () => {
      savePreset('Temp Preset');
      cy.contains('button', 'Clear Presets').click();
      cy.contains('button', 'Temp Preset').should('not.exist');
    });
  });

  const applyFilter = (filterLabel: string, values: string | string[]) => {
    const valuesArray = Array.isArray(values) ? values : [values];

    cy.contains('button', filterLabel).click();
    valuesArray.forEach((value) => {
      cy.contains(value).click();
    });
    cy.contains('button', filterLabel).click();
  };

  function savePreset(name: string) {
    cy.get('input[placeholder="Preset name"]').type(name);
    cy.contains('button', 'Save Preset').click();
  }

  function verifyColumnOrder(
    property: keyof (typeof orders)[0],
    direction: 'asc' | 'desc',
  ) {
    const expected = orders
      .map((o) => o[property])
      .sort((a, b) =>
        direction === 'asc' ? Number(a) - Number(b) : Number(b) - Number(a),
      );

    cy.get(`tbody td:nth-child(${getColumnIndex(property as string)})`).then(
      ($cells) => {
        const actual = Array.from($cells).map(
          (cell) => Number(cell.textContent) || cell.textContent,
        );

        expect(
          actual.sort((a, b) => (Number(a) || 0) - (Number(b) || 0)),
        ).to.eql(expected.map(Number).sort((a, b) => a - b));
      },
    );
  }

  function getColumnIndex(property: string): number {
    const columns = [
      'oid',
      'status',
      'type',
      'lock',
      'customer',
      'daysSinceOrder',
      'model',
      'designer',
    ];
    return columns.indexOf(property) + 1;
  }
});
