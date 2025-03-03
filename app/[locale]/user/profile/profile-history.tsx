"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDateTime } from "@/lib/utils";

import { Filter, Package, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock dati per ordini e azioni dell'utente
const mockOrders = [
  {
    id: "ORD001",
    date: "2025-02-15",
    total: "52.54€",
    status: "Consegnato",
  },
  {
    id: "ORD002",
    date: "2025-01-30",
    total: "22.99€",
    status: "In transito",
  },
];

const mockActions = [
  {
    id: "ACT001",
    date: "2025-02-10",
    description: "Modifica della password",
    icon: <ShieldCheck className="size-5 text-green-500" />,
  },
  {
    id: "ACT002",
    date: "2025-01-25",
    description: "Aggiornamento indirizzo di spedizione",
    icon: <RefreshCw className="size-5 text-blue-500" />,
  },
];

export default function HistoryTab() {
  const [orders] = useState(mockOrders);
  const [actions] = useState(mockActions);
  const [filter, setFilter] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        📜 Cronologia Account
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Controlla i tuoi ordini passati e le modifiche al tuo account.
      </p>

      {/* 🔍 Filtri */}
      <div className="mt-4 flex items-center gap-3">
        <Input
          placeholder="Filtra per ID ordine..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button variant="outline">
          <Filter className="size-5 text-gray-600" />
        </Button>
      </div>

      {/* 📦 Cronologia Ordini */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            🛒 Ordini Passati
          </h3>

          {filteredOrders.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {filteredOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Ordine #{order.id}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Data: {formatDateTime(order.date).dateTime} -{" "}
                      <span className="font-semibold">{order.total}</span>
                    </p>
                  </div>
                  <Badge>{order.status}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Nessun ordine trovato.
            </p>
          )}

          <Link href="/orders">
            <Button className="mt-4 flex w-full items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition hover:bg-indigo-700">
              <Package className="size-5" />
              Vedi tutti gli ordini
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 🔄 Attività Recenti */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            🔄 Attività Recenti
          </h3>

          {actions.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {actions.map((action) => (
                <li
                  key={action.id}
                  className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  {action.icon}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {action.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(action.date).dateTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Nessuna attività recente.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
