import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Loader } from "lucide-react";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import Link from "next/link";

const OrderSummary = ({
  isPending,
  resume,
  goToCheckout,
  userLogged,
}: {
  isPending: boolean;
  resume: {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    totalItems: number;
  };
  userLogged?: {
    role: string;
  } & User;
  goToCheckout: () => void;
}) => {
  const { toast } = useToast();
  const t = useTranslations("Cart.order_summary");
  const checkIfGoToCheckout = () => {
    if (userLogged?.id) {
      return goToCheckout();
    } else {
      toast({
        className:
          "bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-lg shadow-xl border border-indigo-400 text-lg",

        description: (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <svg
                className="size-8 animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 1-7.07 17.07l-4.2 1.12a1 1 0 0 1-1.22-1.22l1.12-4.2A10 10 0 1 1 12 2zM12 4a8 8 0 1 0 5.66 13.66A8 8 0 0 0 12 4z"></path>
                <path d="M10 8a2 2 0 1 1 4 0v4a2 2 0 1 1-4 0V8z"></path>
                <path d="M10 16h4v2h-4z"></path>
              </svg>
              <span className="text-xl font-bold">Iscriviti subito! 🚀</span>
            </div>
            <p className="mt-2 text-base font-medium">
              Per procedere devi prima iscriverti, <br /> iscriviti ora al sito
              e approfitta delle offerte! 🎉
            </p>
            {/* Bottone di iscrizione */}
            <Link
              href="/sign-up"
              className="mt-4 inline-block w-full rounded-full bg-white px-5 py-3 text-center text-lg font-semibold text-indigo-600 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-100"
            >
              ✨ Registrati Ora!
            </Link>
            <span className="mt-2 w-full text-center">hai gia un account?</span>
            <Link
              href="/sign-in"
              className="mt-4 inline-block w-full rounded-full bg-white px-5 py-3 text-center text-lg font-semibold text-indigo-600 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-100"
            >
              ✨ Fai il login!
            </Link>
          </div>
        ),
        duration: 4000,
      });
    }
  };
  return (
    <BrandCard
      title={t("title")}
      className="mt-10 gap-4 rounded-lg border p-4 shadow-md md:mt-0"
    >
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>{t("subtotal")}</span>
          <span className="font-bold">
            {isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              formatCurrency(resume?.itemsPrice)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>{t("discount")}</span>
          <span className="font-bold text-green-600">
            -{formatCurrency(10.0)} {/* Sconto Mockato */}
          </span>
        </div>

        <div className="flex justify-between">
          <span>{t("shipping")}</span>
          <span className="font-bold">
            {formatCurrency(resume?.taxPrice)} {/* Spedizione Mockata */}
          </span>
        </div>

        <hr className="my-2" />

        <div className="flex items-center justify-between text-xl font-semibold text-gray-800">
          <span>{t("total")}</span>
          <span>
            {isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              formatCurrency((Number(resume?.totalPrice) || 0) - 10.0 + 5.99)
            )}
          </span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex items-center gap-2 pb-3 text-lg text-gray-700">
        {t("total_items")}
        <span className=" font-semibold">
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            resume.totalItems
          )}
        </span>
      </div>

      <BrandButton
        onClick={() => checkIfGoToCheckout()}
        loading={isPending}
        variant="primary"
        icon={<ArrowRight className="size-4" />}
      >
        {t("checkout_button")}
      </BrandButton>
    </BrandCard>
  );
};

export default OrderSummary;
