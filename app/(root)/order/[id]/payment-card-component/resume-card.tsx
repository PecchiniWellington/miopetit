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
    <>
      <div className="flex justify-between">
        <div>Items</div>
        <div>{formatCurrency(itemsPrice as unknown as string)}</div>
      </div>
      <div className="flex justify-between">
        <div>Tax</div>
        <div>{formatCurrency(taxPrice as unknown as string)}</div>
      </div>
      <div className="flex justify-between">
        <div>Shipping</div>
        <div>{formatCurrency(shippingPrice as unknown as string)}</div>
      </div>
      <div className="flex justify-between">
        <div>Total</div>
        <div>{formatCurrency(totalPrice as unknown as string)}</div>
      </div>
    </>
  );
};
