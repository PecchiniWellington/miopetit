import GenericCard from "@/components/shared/brand-components/brand-card";
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
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const PlaceOrderTableResume = ({ myCart }: { myCart: ICart }) => {
  const t = useTranslations("Checkout.PlaceOrder");

  return (
    <GenericCard
      title={t("order_items")}
      className="p-6  shadow-lg transition-all hover:shadow-xl md:col-span-2"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
            <TableHead>{t("product")}</TableHead>
            <TableHead className="text-center">{t("quantity")}</TableHead>
            <TableHead className="text-center">{t("price")}</TableHead>
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
              <TableCell className="text-center text-lg">{item.qty}</TableCell>
              <TableCell className="text-center text-lg">
                {formatCurrency(item?.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GenericCard>
  );
};

export default PlaceOrderTableResume;
