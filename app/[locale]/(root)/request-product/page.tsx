import SummaryRequestCard from "@/components/product/summary-request-card";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";
import { formatCurrency } from "@/lib/utils";
import ClientCartAction from "./client-cart-action";

export default async function ShelterCartPage() {
  const myCart = await getMyCart();
  const contributor = await getContributorByUserId(myCart?.userId);

  const total =
    myCart?.items?.reduce(
      (acc, item) => acc + Number(item.costPrice) * item.qty,
      0
    ) ?? 0;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-12 text-center text-4xl font-bold text-gray-900">
        Il tuo Carrello 🐾
      </h1>

      {myCart?.items.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          Il carrello è vuoto.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myCart?.items.map((item) => (
              <SummaryRequestCard
                key={item.productId}
                cart={myCart}
                item={{ ...item, costPrice: Number(item.costPrice) }}
                userId={myCart.userId}
              />
            ))}
          </div>

          {/* Riepilogo Totale */}
          <div className="mx-auto mt-16 max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white text-center shadow-lg">
            <div className="p-6 ">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Totale prodotti richiesti
              </h3>
              <p className=" text-3xl font-bold">
                {formatCurrency(total ?? 0)}
              </p>
              <p className="mt-2 text-sm text-gray-400 line-through">
                Prezzo normale : {formatCurrency(myCart?.totalPrice ?? 0)}
              </p>
              <p className="mt-1 text-sm font-medium text-green-600">
                Risparmio totale:{" "}
                {formatCurrency(Number(myCart?.totalPrice) - Number(total))}
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Quando aggiungi un prodotto alla tua wishlist, non applichiamo
                IVA né sovrapprezzi. Non lo facciamo per interesse, ma per una
                sola ragione: ma per i nostri amici animali. ❤️
              </p>
            </div>
            <div className="bg-gray-100 p-6">
              <ClientCartAction
                contributorId={contributor?.id ?? ""}
                items={myCart?.items ?? []}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
