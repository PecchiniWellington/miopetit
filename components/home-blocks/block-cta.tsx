import BrandButton from "../shared/brand-components/brand-button";

const BlockCTA = () => {
  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl px-6">
      {/* Background decorativo */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-purple-100 via-white to-pink-100 opacity-60 blur-xl" />

      <div className="relative z-10 flex flex-col items-center rounded-xl bg-white px-8 py-12 text-center shadow-xl">
        <h2 className="mb-4 text-4xl font-extrabold text-purple-600 drop-shadow-sm">
          Contatta BioFarm Shop
        </h2>
        <p className="mb-8 max-w-2xl text-lg text-gray-700">
          Vuoi scoprire di più sui nostri prodotti o sui servizi che offriamo?
          Siamo qui per aiutarti!
        </p>
        <BrandButton
          variant="primary"
          className="!bg-gradient-to-r !from-pink-500 !to-purple-600 text-white shadow-md transition hover:scale-105"
        >
          Richiedi informazioni
        </BrandButton>
      </div>
    </section>
  );
};

export default BlockCTA;
