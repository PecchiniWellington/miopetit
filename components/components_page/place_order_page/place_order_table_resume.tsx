import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICart, ICartItem } from "@/core/validators";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const PlaceOrderTableResume = ({ myCart }: { myCart: ICart }) => {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
      <CardContent className="space-y-5 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          🛍️ Articoli nel tuo ordine
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
              <TableHead>Prodotto</TableHead>
              <TableHead className="text-center">Quantità</TableHead>
              <TableHead className="text-center">Prezzo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myCart?.items.map((item: ICartItem) => (
              <TableRow
                key={item.slug}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <TableCell>
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg border shadow-sm"
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-center text-lg">
                  {item.qty}
                </TableCell>
                <TableCell className="text-center text-lg">
                  {formatCurrency(item?.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderTableResume;
