import { Package, ShoppingBag, Truck } from "lucide-react";

export const howWeWorkTabs = [
  {
    id: "choose",
    label: "Scegli il prodotto",
    icon: ShoppingBag,
    image: "/assets/how_it_works/choose.jpg",
    title: "🛒 Trova il prodotto perfetto",
    description:
      "Naviga nel nostro vasto catalogo e scopri una selezione curata di prodotti di alta qualità per il tuo animale domestico.",
    points: [
      "✔️ Prodotti selezionati da esperti",
      "✔️ Filtri intelligenti per trovare ciò di cui hai bisogno",
      "✔️ Recensioni reali di altri amanti degli animali",
    ],
  },
  {
    id: "order",
    label: "Completa l'ordine",
    icon: Package,
    image: "/assets/how_it_works/order.jpg",
    title: "🛍️ Completa il tuo ordine in pochi click",
    description:
      "Una volta scelti i tuoi prodotti, aggiungili al carrello e completa il checkout.",
    points: [
      "✔️ Checkout veloce e sicuro",
      "✔️ Pagamenti con carta, PayPal e bonifico",
      "✔️ Assistenza disponibile per ogni problema",
    ],
  },
  {
    id: "delivery",
    label: "Ricevi a casa",
    icon: Truck,
    image: "/assets/how_it_works/delivery.jpg",
    title: "🚚 Spedizione veloce e tracciata",
    description:
      "Ordina e ricevi comodamente a casa tua con spedizioni rapide.",
    points: [
      "✔️ Consegna in 24-72h",
      "✔️ Tracking sempre aggiornato",
      "✔️ Opzione di reso facile se necessario",
    ],
  },
];
