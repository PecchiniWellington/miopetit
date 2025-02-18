import { BadgeStatus } from "@/components/shared/badge-status";

export const OrdersTab = () => (
  <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
    <h2 className="text-xl font-semibold">📦 Ordini Recenti</h2>
    <div className="mt-4 space-y-4">
      {[1, 2, 3].map((order) => (
        <div
          key={order}
          className="flex items-center justify-between rounded-md border p-3"
        >
          <div>
            <p className="text-gray-800">Ordine #1234</p>
            <p className="text-sm text-gray-600">Data: 12 Feb 2025</p>
          </div>
          <BadgeStatus status="shipped">Spedito</BadgeStatus>
        </div>
      ))}
    </div>
  </div>
);
