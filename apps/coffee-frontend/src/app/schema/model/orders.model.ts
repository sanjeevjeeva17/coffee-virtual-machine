export interface OrdersModel {
  id: number;
  coffeeType: string;
  size: string;
  sugar: string | null; // or `number` if it represents a quantity
  timestamp: Date | string; // use `Date` if you need date manipulation, or `string` if it’s only for display
  milk: string | null;
}
