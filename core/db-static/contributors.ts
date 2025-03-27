import { faker } from "@faker-js/faker";
import { ContributorType } from "@prisma/client";

const contributorsData = Array.from({ length: 20 }).map((_, i) => {
  const isRetailer = i >= 15; // ultimi 5 come retailer
  const name = isRetailer ? `Retailer ${i + 1}` : `Canile ${i + 1}`;
  const city = faker.location.city();

  return {
    name,
    slug: `contributor-${i + 1}`,
    type: isRetailer
      ? ("RETAILER" as ContributorType)
      : ("CANILE" as ContributorType),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    website: faker.internet.url(),
    logo: "/uploads/default-logo.png",
    coverImage: "/uploads/default-cover.jpg",
    description: isRetailer
      ? "Il tuo negozio di fiducia per prodotti dedicati agli animali."
      : "Un rifugio sicuro per cani e gatti in cerca di casa.",
    descriptionLong: isRetailer
      ? "Offriamo una vasta gamma di prodotti per il benessere e la felicità degli animali domestici."
      : "Accogliamo e curiamo animali abbandonati per offrire loro una nuova possibilità. Collaboriamo con volontari e famiglie adottive.",
    tags: isRetailer
      ? ["shop", "prodotti", "pet"]
      : ["adozione", "animali", "volontariato"],
    address: faker.location.streetAddress(),
    city,
    province: faker.location.state().slice(0, 2).toUpperCase(),
    region: faker.location.state(),
    zipCode: faker.location.zipCode(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    partitaIva: faker.finance.accountNumber(11),
    isOnlineShop: isRetailer,
    isPickupAvailable: faker.datatype.boolean(),
    deliveryAvailable: faker.datatype.boolean(),
    openingHours: {
      lunedi: "9:00-18:00",
      martedi: "9:00-18:00",
      sabato: "10:00-14:00",
    },
    socialLinks: {
      instagram: `https://instagram.com/${faker.internet.userName()}`,
      facebook: `https://facebook.com/${faker.internet.userName()}`,
    },
    whatsappNumber: faker.phone.number(),
    animalsAvailable: isRetailer
      ? null
      : faker.number.int({ min: 10, max: 50 }),
    animalTypes: isRetailer ? [] : ["cani", "gatti"],
    acceptsDonations: !isRetailer && faker.datatype.boolean(),
    donationLink: !isRetailer ? faker.internet.url() : null,
    volunteerNeeded: !isRetailer && faker.datatype.boolean(),
    needs: !isRetailer ? ["cibo", "volontari", "medicinali"] : [],
    seoTitle: `${name} - ${isRetailer ? "Prodotti per Animali" : "Adozioni e Volontariato"}`,
    seoDescription: isRetailer
      ? "Scopri i migliori articoli per animali. Acquista online o visita il nostro punto vendita."
      : "Aiutiamo gli animali a trovare una casa. Scopri come adottare, donare o diventare volontario.",
  };
});

export default contributorsData;
