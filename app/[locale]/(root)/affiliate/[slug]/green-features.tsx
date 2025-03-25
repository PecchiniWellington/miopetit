"use client";
import { CheckCircle } from "lucide-react"; // Aggiungi l'icona check per ogni punto

export default function GreenFeaturesSection() {
  return (
    <section className="space-y-8 bg-slate-900 px-6 py-16 md:px-16">
      <h2 className="text-center text-4xl font-semibold text-white">
        Perché Siamo Davvero Green? 🌍
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Green Features Items */}
        <div className="flex items-center space-x-4">
          <CheckCircle className="text-green-500" size={40} />
          <div>
            <h3 className="text-xl font-medium text-white">
              Fornitori certificati eco-friendly
            </h3>
            <p className="text-gray-400">
              Scegliamo solo fornitori che rispettano l'ambiente.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CheckCircle className="text-yellow-500" size={40} />
          <div>
            <h3 className="text-xl font-medium text-white">
              Zero plastica negli imballaggi
            </h3>
            <p className="text-gray-400">
              I nostri imballaggi sono completamente ecologici.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CheckCircle className="text-blue-500" size={40} />
          <div>
            <h3 className="text-xl font-medium text-white">
              Spedizioni a impatto zero
            </h3>
            <p className="text-gray-400">
              Tutti gli ordini sono inviati con metodi ecologici.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CheckCircle className="text-purple-500" size={40} />
          <div>
            <h3 className="text-xl font-medium text-white">
              Collaborazioni con ONG ambientali
            </h3>
            <p className="text-gray-400">
              Sosteniamo attivamente le ONG che tutelano il pianeta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
