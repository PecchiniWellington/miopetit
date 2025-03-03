import { formatCurrency } from "@/lib/utils";

export const ResumeCard = ({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
}: {
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
}) => {
  return (
    <div className="w-full rounded-lg border bg-white p-5 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Riepilogo Ordine
      </h2>

      <div className="space-y-3">
        {/* 📦 Subtotale */}
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotale</span>
          <span className="font-medium">{formatCurrency(itemsPrice)}</span>
        </div>

        {/* 🏦 Tassa */}
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>IVA</span>
          <span className="font-medium">{formatCurrency(taxPrice)}</span>
        </div>

        {/* 🚚 Spedizione */}
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Spedizione</span>
          <span className="font-medium">{formatCurrency(shippingPrice)}</span>
        </div>

        {/* 🔥 Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700"></div>

        {/* 💰 Totale */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
          <span>Totale</span>
          <span className="text-green-600 dark:text-green-400">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
