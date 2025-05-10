export type OrderStatus =
  | 'Ready for Packaging'
  | 'Drying'
  | 'QC'
  | 'Delivered'
  | 'Printing'
  | 'Open Order';

export type OrderType = 'Sample' | 'Order' | 'Seeding' | 'B2C';

export type Preset = {
  id: string;
  name: string;
  queryString: string;
};

export type Order = {
  oid: number;
  statusLeft: OrderStatus;
  statusRight: OrderStatus;
  type: OrderType;
  lock: string;
  customer: string;
  daysSinceOrder: number;
  model: string;
  designer: string;
};
