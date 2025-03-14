const AboutUsReview = () => {
  return (
    <div className="py-12">
      <h2 className="text-center text-3xl font-bold">
        Cosa dicono i nostri clienti? 💬
      </h2>
      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="text-gray-700">
            &quot;Prodotti di ottima qualità e spedizioni velocissime! Il mio
            cane adora i nuovi snack!&quot;
          </p>
          <p className="mt-2 text-gray-500">— Alice R.</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="text-gray-700">
            &quot;Servizio clienti eccezionale! Mi hanno aiutato a scegliere il
            miglior cibo per il mio gatto.&quot;
          </p>
          <p className="mt-2 text-gray-500">— Marco T.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsReview;
