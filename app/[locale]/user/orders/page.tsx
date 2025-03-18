import BrandBadge from "@/components/shared/brand-components/brand-badge";
import Pagination from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrders } from "@/core/actions/order/order.action";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Check, CircleAlert } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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
                  {formatDateTime(order.createdAt.toString()).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <BrandBadge
                      label={formatDateTime(order.paidAt.toString()).dateTime}
                      variant="success"
                      icon={<Check className="ml-2" height={15} width={15} />}
                    />
                  ) : (
                    <BrandBadge
                      label="Not Paid"
                      variant="danger"
                      icon={
                        <CircleAlert className="ml-2" height={15} width={15} />
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt ? (
                    <BrandBadge
                      label={
                        formatDateTime(order.deliveredAt.toString()).dateTime
                      }
                      variant="success"
                      icon={<Check className="ml-2" height={15} width={15} />}
                    />
                  ) : (
                    <BrandBadge
                      label="Not Delivered"
                      variant="danger"
                      icon={
                        <CircleAlert className="ml-2" height={15} width={15} />
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/order/${order.id}`}
                    className="primary-gradient min-h-[24px] rounded-lg border-0.2 border-slate-300 px-4 py-2 !text-light-900"
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
