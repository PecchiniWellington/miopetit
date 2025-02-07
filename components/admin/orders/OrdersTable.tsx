"use client";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { IOrder } from "@/types/_index";
import { motion } from "framer-motion";
import { Check, CircleAlert, ClockAlert, Eye, Search } from "lucide-react";
import { useState } from "react";

const orderData = [
  {
    id: "ORD001",
    customer: "John Doe",
    total: 235.4,
    status: "Delivered",
    date: "2023-07-01",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    total: 412.0,
    status: "Processing",
    date: "2023-07-02",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    total: 162.5,
    status: "Shipped",
    date: "2023-07-03",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    total: 750.2,
    status: "Pending",
    date: "2023-07-04",
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    total: 95.8,
    status: "Delivered",
    date: "2023-07-05",
  },
  {
    id: "ORD006",
    customer: "Eva Martinez",
    total: 310.75,
    status: "Processing",
    date: "2023-07-06",
  },
  {
    id: "ORD007",
    customer: "David Lee",
    total: 528.9,
    status: "Shipped",
    date: "2023-07-07",
  },
  {
    id: "ORD008",
    customer: "Grace Taylor",
    total: 189.6,
    status: "Delivered",
    date: "2023-07-08",
  },
];

const OrdersTable = ({ orders }: { orders: { data: IOrder[] } }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setFilteredOrders] = useState(orderData);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    setSearchTerm(term);
    const filtered = orderData?.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  return (
    <motion.div
      className="rounded-xl border border-gray-700 bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">Order List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="rounded-lg bg-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Buyer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Delivered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {orders.data.map((order: IOrder) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                  {formatId(order.id)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                  {formatDateTime(order.createdAt.toString()).dateTime}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                  {order?.user?.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
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
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
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
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <button className="mr-2 text-indigo-400 hover:text-indigo-300">
                    <Eye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default OrdersTable;
