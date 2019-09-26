export interface Expense {
  _id: string;
  name: string;
  price: number;
  location: string;
  date: Date;
  category: string;
  vat: number;
  receipt?: string;
}
