import { auth } from "@/auth";
import DynamicButton from "@/components/dynamic-button";
import LayoutTitle from "@/components/layout-title";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrder, getAllOrders } from "@/core/actions/admin/admin.actions";

import ROLES from "@/lib/constants/roles";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { IOrder } from "@/types";
import { Check, CircleAlert, ClockAlert, Edit2 } from "lucide-react";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;
  const session = await auth();

  if (session?.user?.role !== ROLES.ADMIN) throw new Error("Unauthorized");

  const ordersResponse = await getAllOrders({
    page: Number(page),
    query: searchText,
  });
  const orders = JSON.parse(JSON.stringify(ordersResponse));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <LayoutTitle title="Orders" />
        {searchText && (
          <div>
            Filterd by <i>&quot;{searchText}&quot;</i>{" "}
            <DynamicButton>
              <Link href="/admin/orders">Remove Filter</Link>
            </DynamicButton>
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
            {orders.data.map((order: IOrder) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt.toString()).dateTime}
                </TableCell>
                <TableCell>{order?.user?.name}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <Badge className="bg-green-100 text-green-700">
                      {formatDateTime(order.paidAt.toString()).dateTime}

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
                      {formatDateTime(order.deliveredAt.toString()).dateTime}
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
                  <DynamicButton>
                    <Link href={`/order/${order.id}`}>
                      <Edit2 height={10} width={10} />
                    </Link>
                  </DynamicButton>

                  <DeleteDialog id={order.id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/*   {orders.totalPages > 1 && ( */}
        <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />
        {/*  )} */}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
