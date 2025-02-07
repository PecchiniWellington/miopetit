import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ILatestSales } from "@/core/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import Link from "next/link";

const RecentSalesTable = ({ summary }: { summary: ILatestSales[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>BUYER</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {summary?.map((order: ILatestSales) => (
          <TableRow key={order.id}>
            <TableCell>{order.user?.name}</TableCell>
            <TableCell>
              {formatDateTime(order.createdAt.toString()).dateOnly}
            </TableCell>
            <TableCell>{formatCurrency(order.totalPrice.toString())}</TableCell>
            <TableCell>
              <Link
                className="rounded-md border-2 px-2 py-1 "
                href={`/order/${order.id}`}
              >
                Detail
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentSalesTable;
