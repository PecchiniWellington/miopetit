import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrderItemInsert } from "@/core/validators/orders.validator";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ResumeItemsTable = ({
  orderitems,
}: {
  orderitems: IOrderItemInsert[];
}) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Table className="w-full">
        {/* 🌟 Intestazione della tabella */}
        <TableHeader className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <TableRow>
            <TableHead className="px-4 py-3 text-left">Articolo</TableHead>
            <TableHead className="px-4 py-3 text-center">Quantità</TableHead>
            <TableHead className="px-4 py-3 text-right">Prezzo</TableHead>
          </TableRow>
        </TableHeader>

        {/* 📦 Corpo della tabella */}
        <TableBody>
          {orderitems.map((item) => (
            <TableRow
              key={item.slug}
              className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {/* 📸 **Colonna immagine e nome** */}
              <TableCell className="flex items-center space-x-4 p-4">
                <Link
                  href={`/product/${item.slug}`}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md border border-gray-200 shadow-sm dark:border-gray-700"
                  />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </span>
                </Link>
              </TableCell>

              {/* 🔢 **Colonna quantità** */}
              <TableCell className="p-4 text-center text-gray-700 dark:text-gray-300">
                {item.qty}
              </TableCell>

              {/* 💰 **Colonna prezzo** */}
              <TableCell className="p-4 text-right font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(item.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResumeItemsTable;
