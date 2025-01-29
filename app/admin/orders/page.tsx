import { auth } from "@/auth";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import { getAllOrders } from "@/lib/actions/order/order.action";
import { formatId, formatDateTime, formatCurrency } from "@/lib/utils";
import { Check, CircleAlert, ClockAlert, Edit2, Trash2 } from "lucide-react";

import { Metadata } from "next";
import Link from "next/link";
import React from "react";

const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = "1" } = await props.searchParams;
  const session = await auth();

  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  const orders = await getAllOrders({ page: Number(page) });

  return (
    <div className="space-y-2">
      <div className="h2-bold">Orders</div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <Badge className="bg-green-100 text-green-700">
                      {formatDateTime(order.paidAt).dateTime}

                      <Check className="ml-2" height={15} width={15} />
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700">
                      Not Paid{" "}
                      <CircleAlert className="ml-2" height={15} width={15} />
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt ? (
                    <Badge className="bg-green-100 text-green-700">
                      {formatDateTime(order.deliveredAt).dateTime}
                      <Check className="ml-2" height={15} width={15} />
                    </Badge>
                  ) : (
                    <Badge className="bg-orange-100 text-orange-700">
                      Not delivered{" "}
                      <ClockAlert className="ml-2" height={15} width={15} />
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Button className="bg-slate-100 text-slate-700 px-4 py-2">
                    <Link href={`/order/${order.id}`}>
                      <Edit2 height={10} width={10} />
                    </Link>
                  </Button>
                  <Button className="bg-red-100 text-red-700 px-4 py-2">
                    <Trash2 height={10} width={10} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
