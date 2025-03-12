/* import { APP_NAME } from "@/lib/constants";
import { getCurrentYear } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="flex-center p-5">
        {getCurrentYear()} © {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
 */

import { APP_NAME } from "@/lib/constants";
import { getCurrentYear } from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-4">
        {/* 🛍️ Sezione Shop */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Shop</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/products" className="hover:text-purple-600">
                Tutti i prodotti
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-purple-600">
                Categorie
              </Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-purple-600">
                Offerte speciali
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-purple-600">
                Novità
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Sezione Supporto */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Supporto</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/faq" className="hover:text-purple-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-purple-600">
                Spedizioni e resi
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-600">
                Contattaci
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-purple-600">
                Termini e condizioni
              </Link>
            </li>
          </ul>
        </div>

        {/* 🐾 Sezione Azienda */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">MioPetit</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/about" className="hover:text-purple-600">
                Chi siamo
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className="hover:text-purple-600">
                Sostenibilità
              </Link>
            </li>
            <li>
              <Link href="/partners" className="hover:text-purple-600">
                Diventa partner
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-purple-600">
                Lavora con noi
              </Link>
            </li>
          </ul>
        </div>

        {/* 📬 Sezione Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Rimani aggiornato</h3>
          <p className="mt-2 text-sm text-gray-600">
            Iscriviti alla nostra newsletter per offerte esclusive e novità.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Inserisci la tua email"
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="rounded-r-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </div>

      {/* 📌 Linea divisoria */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        {getCurrentYear()} © {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
