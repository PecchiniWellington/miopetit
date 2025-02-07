export type ILatestSales = {
  user: { name: string } | null;
  id: string;
  createdAt: Date;
  totalPrice: string;
};

export type SalesDataType = {
  month: string;
  totalSales: number;
}[];
