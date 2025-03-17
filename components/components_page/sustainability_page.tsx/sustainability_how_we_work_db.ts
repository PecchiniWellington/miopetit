import { CreditCard, Leaf, Package } from "lucide-react";

export const sustainabilityTabs = [
  {
    id: "products",
    label: "Prodotti Sostenibili",
    icon: Leaf,
    image: "/assets/sustainability/products.jpg",
    title: "🌱 Prodotti Sostenibili",
    description:
      "Selezioniamo solo prodotti realizzati con ingredienti naturali e materiali riciclati o biodegradabili, per garantire benessere agli animali senza impattare negativamente l'ambiente.",
    points: [
      "✔️ Alimenti BIO certificati",
      "✔️ Giochi e accessori in materiali riciclati",
      "✔️ Prodotti cruelty-free e privi di sostanze nocive",
    ],
  },
  {
    id: "packaging",
    label: "Packaging Eco-Friendly",
    icon: Package,
    image: "/assets/sustainability/packaging.jpg",
    title: "📦 Packaging Eco-Friendly",
    description:
      "Il nostro packaging è 100% riciclabile e compostabile, riducendo al minimo l’uso di plastica e materiali non sostenibili. Anche l'inchiostro usato per le stampe è ecologico e a base vegetale.",
    points: [
      "✔️ Scatole in cartone riciclato",
      "✔️ Inchiostri a base vegetale",
      "✔️ Riduzione degli imballaggi superflui",
    ],
  },
  {
    id: "payments",
    label: "Pagamenti Green",
    icon: CreditCard,
    image: "/assets/sustainability/payments.jpg",
    title: "💳 Pagamenti Green",
    description:
      "Collaboriamo con circuiti di pagamento eco-sostenibili che reinvestono parte delle loro commissioni in progetti ambientali. Inoltre, ogni transazione digitale aiuta a ridurre l’uso della carta.",
    points: [
      "✔️ Pagamenti con banche ecosostenibili",
      "✔️ Zero emissioni per le transazioni digitali",
      "✔️ Partnership con ONG ambientali",
    ],
  },
];
