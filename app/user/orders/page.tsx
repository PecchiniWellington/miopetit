import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrders } from "@/lib/actions/order/order.action";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import Link from "next/link";
import { Check, CircleAlert, ClockAlert } from "lucide-react";
import Pagination from "@/components/shared/pagination";

export const metadata: Metadata = {
  title: "My Orders",
  description: "User orders page",
};

const UserOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getMyOrders({ page: Number(page) || 1 });

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
                <TableCell>
                  <Link
                    href={`/order/${order.id}`}
                    className="primary-gradient px-4 py-2 min-h-[24px] !text-light-900 border-0.2 border-slate-300 rounded-lg"
                  >
                    <span className="px-2">Details</span>
                  </Link>
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

export default UserOrdersPage;
