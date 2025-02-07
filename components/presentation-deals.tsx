import Image from "next/image";

export default async function PresentationDeals() {
  const presentationDeals = [
    {
      title: "Affari Quindici",
      image: "/images/affari-quindici.png",
    },
    {
      title: "Migliori Prodotti",
      image: "/images/migliori-prodotti.png",
    },
    {
      title: "Prendi 3",
      image: "/images/prendi-3.png",
    },
    {
      title: "Quaranta Percento",
      image: "/images/quaranta-percento.png",
    },
    {
      title: "Risparmia 30",
      image: "/images/risparmia-30.png",
    },
  ];

  return (
    <>
      {presentationDeals.map((deal) => (
        <div key={deal.title} className="relative">
          <Image
            src={deal.image}
            alt="product"
            width={400}
            height={400}
            className="h-auto w-full"
          />
        </div>
      ))}
    </>
  );
}
