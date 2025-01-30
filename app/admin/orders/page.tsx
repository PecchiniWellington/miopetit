import { auth } from "@/auth";
import DeleteDialog from "@/components/shared/delete-dialog";
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
import { deleteOrder, getAllOrders } from "@/lib/actions/admin/admin.actions";

import ROLES from "@/lib/constants/roles";
import { formatId, formatDateTime, formatCurrency } from "@/lib/utils";
import { Check, CircleAlert, ClockAlert, Edit2, Trash2 } from "lucide-react";

import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;
  const session = await auth();

  if (session?.user?.role !== ROLES.ADMIN) throw new Error("Unauthorized");

  const orders = await getAllOrders({ page: Number(page), query: searchText });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders</h1>
        {searchText && (
          <div>
            Filterd by <i>&quot;{searchText}&quot;</i>{" "}
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}{" "}
        {/* TODO: uguale a quello del product */}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
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
                <TableCell>{order?.user?.name}</TableCell>
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

                  <DeleteDialog id={order.id} action={deleteOrder} />
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
