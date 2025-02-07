import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrderItem } from "@/core/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ResumeItemsTable = ({ orderitems }: { orderitems: IOrderItem[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderitems.map((item: IOrderItem) => (
          <TableRow key={item.slug}>
            <TableCell>
              <Link
                href={`/product/${item.slug}`}
                className="flex items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />

                <span className="px-2">{item.name}</span>
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/product/${item.slug}`}>
                <span className="px-2">{item.qty}</span>
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/product/${item.slug}`}>
                <span className="px-2">{formatCurrency(item?.price)}</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResumeItemsTable;
