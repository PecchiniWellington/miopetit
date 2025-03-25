const contributorsData = [
  {
    name: "Canile di Padova",
    slug: "canile-padova",
    type: "CANILE",
    email: "info@canilepadova.it",
    phone: "0491234567",
    website: "https://canilepadova.it",
    logo: "/uploads/canile-logo.png",
    coverImage: "/uploads/canile-cover.jpg",
    description: "Un rifugio sicuro per cani in cerca di casa.",
    descriptionLong:
      "Da oltre 20 anni accogliamo e curiamo animali abbandonati con l'obiettivo di trovare loro una nuova famiglia amorevole.",
    tags: ["adozione", "animali", "volontariato"],
    address: "Via degli Animali, 5",
    city: "Padova",
    province: "PD",
    region: "Veneto",
    zipCode: "35100",
    latitude: 45.4064,
    longitude: 11.8768,
    partitaIva: "01234567890",
    isOnlineShop: false,
    isPickupAvailable: true,
    deliveryAvailable: false,
    openingHours: {
      lunedi: "9:00-18:00",
      sabato: "10:00-14:00",
    },
    socialLinks: {
      instagram: "https://instagram.com/canilepadova",
      facebook: "https://facebook.com/canilepadova",
    },
    whatsappNumber: "+393201234567",
    animalsAvailable: 32,
    animalTypes: ["cani"],
    acceptsDonations: true,
    donationLink: "https://paypal.me/canilepadova",
    volunteerNeeded: true,
    needs: ["cibo", "volontari", "medicinali"],
    seoTitle: "Canile di Padova - Adozioni e Volontariato",
    seoDescription:
      "Aiutiamo gli animali a trovare una casa. Scopri come adottare, donare o diventare volontario.",
  },
];

export default contributorsData;
/* const contributorsData = [
  {
    name: "contributor-schema-and-types",
    type: "code/ts",
    content: `
	  // ✅ Prisma Seed Example (optional)
	  import { PrismaClient } from "@prisma/client";
	  const prisma = new PrismaClient();

	  async function main() {
		await prisma.contributor.create({
		  data: {
			name: "Canile di Padova",
			slug: "canile-padova",
			type: "CANILE",
			email: "info@canilepadova.it",
			phone: "0491234567",
			website: "https://canilepadova.it",
			logo: "/uploads/canile-logo.png",
			coverImage: "/uploads/canile-cover.jpg",
			description: "Un rifugio sicuro per cani in cerca di casa.",
			descriptionLong: "Da oltre 20 anni accogliamo e curiamo animali abbandonati con l'obiettivo di trovare loro una nuova famiglia amorevole.",
			tags: ["adozione", "animali", "volontariato"],
			address: "Via degli Animali, 5",
			city: "Padova",
			province: "PD",
			region: "Veneto",
			zipCode: "35100",
			latitude: 45.4064,
			longitude: 11.8768,
			partitaIva: "01234567890",
			isOnlineShop: false,
			isPickupAvailable: true,
			deliveryAvailable: false,
			openingHours: {
			  lunedi: "9:00-18:00",
			  sabato: "10:00-14:00"
			},
			socialLinks: {
			  instagram: "https://instagram.com/canilepadova",
			  facebook: "https://facebook.com/canilepadova"
			},
			whatsappNumber: "+393201234567",
			animalsAvailable: 32,
			animalTypes: ["cani"],
			acceptsDonations: true,
			donationLink: "https://paypal.me/canilepadova",
			volunteerNeeded: true,
			needs: ["cibo", "volontari", "medicinali"],
			seoTitle: "Canile di Padova - Adozioni e Volontariato",
			seoDescription: "Aiutiamo gli animali a trovare una casa. Scopri come adottare, donare o diventare volontario."
		  },
		});

		console.log("✅ Contributor seed inserito con successo.");
	  }

	  main()
		.catch((e) => console.error(e))
		.finally(() => prisma.$disconnect());
	`,
  },
];

export default contributorsData;
 */
