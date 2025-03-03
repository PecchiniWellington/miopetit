"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, CreditCard, RefreshCcw, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockSubscription = {
  plan: "Premium",
  price: "9.99€ / mese",
  renewalDate: "2025-03-01",
  features: [
    "Spedizione gratuita su tutti gli ordini",
    "Sconti esclusivi fino al 20%",
    "Accesso anticipato alle offerte",
    "Assistenza prioritaria 24/7",
  ],
};

export default function SubscriptionTab() {
  const [subscription, setSubscription] = useState<{
    plan: string;
    price: string;
    renewalDate: string;
    features: string[];
  } | null>(mockSubscription);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelSubscription = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setSubscription(null);
      setIsCancelling(false);
    }, 2000);
  };

  return (
    <div className="bg-whiteshadow-lg relative rounded-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        🎟️ Il tuo Abbonamento
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gestisci il tuo abbonamento e scopri i vantaggi esclusivi.
      </p>

      {subscription ? (
        <Card className="mt-5 border border-gray-300 dark:border-gray-700">
          <CardContent className="p-5">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {subscription.plan}
                </span>
                <Badge>Attivo</Badge>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {subscription.price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prossimo rinnovo:{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {subscription.renewalDate}
                </span>
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-3 md:flex-row">
                <Link href="/subscriptions">
                  <Button className="flex w-full items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition hover:bg-indigo-700">
                    <RefreshCcw className="size-5" />
                    Cambia Piano
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  className="flex w-full max-w-fit items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <RefreshCcw className="size-5 animate-spin" />
                      Annullamento in corso...
                    </>
                  ) : (
                    <>
                      <XCircle className="size-5" />
                      Disdici Abbonamento
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-5 flex flex-col items-center space-y-4 rounded-lg border border-gray-300 p-5 text-center dark:border-gray-700">
          <CreditCard className="size-10 text-gray-500 dark:text-gray-400" />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Nessun abbonamento attivo
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Scopri i vantaggi e abbonati per ottenere offerte esclusive.
          </p>
          <Link href="/subscriptions">
            <Button className="mt-3 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition hover:bg-indigo-700">
              🎟️ Scopri i Piani
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
