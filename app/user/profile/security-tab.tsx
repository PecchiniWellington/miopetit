import { Button } from "@/components/ui/button";

export const SecurityTab = () => (
  <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
    <h2 className="text-xl font-semibold">🔒 Sicurezza</h2>
    <p className="mt-2 text-gray-600">Gestisci password e autenticazione</p>
    <Button className="mt-4">Cambia Password</Button>
  </div>
);
