export const useAddNewAddress = () => {
  return {
    fullName: {
      it: "Mario Rossi",
      en: "John Doe",
      es: "Juan Pérez",
      fr: "Jean Dupont",
      de: "Max Mustermann",
      default: "Full Name",
    },
    email: {
      it: "tuamail@email.it",
      en: "yourmail@email.com",
      es: "tucorreo@email.es",
      fr: "votreemail@email.fr",
      de: "deinemail@email.de",
      default: "you@example.com",
    },
    street: {
      it: "Via Roma 123",
      en: "123 Main St",
      es: "Calle Mayor 123",
      fr: "123 Rue Principale",
      de: "Hauptstraße 123",
      default: "Street Address",
    },
    city: {
      it: "Milano",
      en: "London",
      es: "Madrid",
      fr: "Paris",
      de: "Berlin",
      default: "City",
    },
    zipCode: {
      it: "20100",
      en: "10001",
      es: "28001",
      fr: "75001",
      de: "10115",
      default: "ZIP Code",
    },
    country: {
      it: "Italia",
      en: "England",
      es: "España",
      fr: "France",
      de: "Deutschland",
      default: "Country",
    },
  };
};
