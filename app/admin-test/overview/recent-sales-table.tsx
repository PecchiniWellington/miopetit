import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatDateTime, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const RecentSalesTable = ({ summary }: any) => {
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
        {summary.latestSales.map((order: any) => (
          <TableRow key={order.id}>
            <TableCell>{order.user?.name}</TableCell>
            <TableCell>{formatDateTime(order.createdAt).dateOnly}</TableCell>
            <TableCell>{formatCurrency(order.totalPrice.toString())}</TableCell>
            <TableCell>
              <Link
                className="border-2 py-1 px-2 rounded-md "
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
