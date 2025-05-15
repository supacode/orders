import { fn } from 'storybook/test';
import { Table, Thead, Tbody, Tr, Td, Th } from './AppTable';

export const UserTable = () => (
  <Table>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Role</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>John Doe</Td>
        <Td>john@example.com</Td>
        <Td>Admin</Td>
        <Td>Active</Td>
      </Tr>
      <Tr>
        <Td>Jane Smith</Td>
        <Td>jane@example.com</Td>
        <Td>User</Td>
        <Td>Active</Td>
      </Tr>
      <Tr>
        <Td>Bob Johnson</Td>
        <Td>bob@example.com</Td>
        <Td>User</Td>
        <Td>Inactive</Td>
      </Tr>
    </Tbody>
  </Table>
);

export const ProductTable = () => (
  <Table>
    <Thead>
      <Tr>
        <Th>Product</Th>
        <Th>Category</Th>
        <Th>Price</Th>
        <Th>Stock</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>MacBook Pro</Td>
        <Td>Electronics</Td>
        <Td>$1,299</Td>
        <Td>25</Td>
      </Tr>
      <Tr>
        <Td>Wireless Mouse</Td>
        <Td>Accessories</Td>
        <Td>$29.99</Td>
        <Td>150</Td>
      </Tr>
      <Tr>
        <Td>Mechanical Keyboard</Td>
        <Td>Accessories</Td>
        <Td>$89.99</Td>
        <Td>12</Td>
      </Tr>
    </Tbody>
  </Table>
);

export const OrderTable = () => (
  <Table>
    <Thead>
      <Tr>
        <Th onClick={fn()}>Order ID ↓</Th>
        <Th onClick={fn()}>Customer</Th>
        <Th onClick={fn()}>Date</Th>
        <Th onClick={fn()}>Amount</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>#ORD-001</Td>
        <Td>John Doe</Td>
        <Td>2024-01-15</Td>
        <Td>$299.99</Td>
      </Tr>
      <Tr>
        <Td>#ORD-002</Td>
        <Td>Jane Smith</Td>
        <Td>2024-01-16</Td>
        <Td>$149.50</Td>
      </Tr>
      <Tr>
        <Td>#ORD-003</Td>
        <Td>Bob Johnson</Td>
        <Td>2024-01-17</Td>
        <Td>$89.99</Td>
      </Tr>
    </Tbody>
  </Table>
);

export const TaskTable = () => (
  <Table>
    <Thead>
      <Tr>
        <Th>Task</Th>
        <Th>Assignee</Th>
        <Th>Due Date</Th>
        <Th>Priority</Th>
      </Tr>
    </Thead>
    <Tbody striped={false}>
      <Tr>
        <Td>Design Homepage</Td>
        <Td>Sarah Lee</Td>
        <Td>2024-01-25</Td>
        <Td>High</Td>
      </Tr>
      <Tr>
        <Td>Implement API</Td>
        <Td>Mike Chen</Td>
        <Td>2024-01-30</Td>
        <Td>Medium</Td>
      </Tr>
      <Tr>
        <Td>Write Tests</Td>
        <Td>Emily Davis</Td>
        <Td>2024-02-05</Td>
        <Td>Low</Td>
      </Tr>
    </Tbody>
  </Table>
);
