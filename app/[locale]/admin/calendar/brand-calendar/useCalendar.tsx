"use client";

import {
  Briefcase,
  CalendarDays,
  Dumbbell,
  FolderOpenDot,
  PartyPopper,
  Smile,
  Stethoscope,
} from "lucide-react";
import React, { createContext, JSX, useContext, useState } from "react";

const CalendarContext = createContext<ReturnType<typeof useCalendar> | null>(
  null
);

export const getIconaCategoria = (nome: string): JSX.Element => {
  const nomeLower = nome.toLowerCase();
  if (nomeLower.includes("lavoro")) return <Briefcase size={16} />;
  if (nomeLower.includes("festa") || nomeLower.includes("evento"))
    return <PartyPopper size={16} />;
  if (nomeLower.includes("sport")) return <Dumbbell size={16} />;
  if (nomeLower.includes("salute")) return <Stethoscope size={16} />;
  if (nomeLower.includes("personale") || nomeLower.includes("me"))
    return <Smile size={16} />;
  if (nomeLower.includes("vacanza")) return <CalendarDays size={16} />;
  return <FolderOpenDot size={16} />;
};

export const useCalendar = () => {
  const [dataCorrente, setDataCorrente] = useState(new Date(2025, 3));
  const [vista, setVista] = useState<"day" | "week" | "month" | "year">(
    "month"
  );
  const [eventi, setEventi] = useState<
    Record<string, { titolo: string; descrizione: string; categoria: string }[]>
  >({
    "2025-04-10": [
      {
        titolo: "Riunione Team",
        descrizione: "Discussione sul progetto Alpha",
        categoria: "Lavoro",
      },
    ],
    "2025-04-20": [
      {
        titolo: "Pasqua",
        descrizione: "Festività nazionale",
        categoria: "Festività",
      },
    ],
  });

  const [eventoSelezionato, setEventoSelezionato] = useState<{
    data: string;
    eventi: { titolo: string; descrizione: string; categoria: string }[];
  } | null>(null);

  const [formEventoData, setFormEventoData] = useState<string | null>(null);
  const [formTitolo, setFormTitolo] = useState("");
  const [formDescrizione, setFormDescrizione] = useState("");
  const [formCategoria, setFormCategoria] = useState("Festività");

  const giorniNelMese = (anno: number, mese: number) =>
    new Date(anno, mese + 1, 0).getDate();
  const primoGiornoSettimana = (anno: number, mese: number) =>
    new Date(anno, mese, 1).getDay();
  const formattaData = (data: Date) => data.toISOString().split("T")[0];

  const cambiaData = (direzione: "avanti" | "indietro") => {
    const nuovaData = new Date(dataCorrente);
    switch (vista) {
      case "day":
        nuovaData.setDate(
          dataCorrente.getDate() + (direzione === "avanti" ? 1 : -1)
        );
        break;
      case "week":
        nuovaData.setDate(
          dataCorrente.getDate() + (direzione === "avanti" ? 7 : -7)
        );
        break;
      case "month":
        nuovaData.setMonth(
          dataCorrente.getMonth() + (direzione === "avanti" ? 1 : -1)
        );
        break;
      case "year":
        nuovaData.setFullYear(
          dataCorrente.getFullYear() + (direzione === "avanti" ? 1 : -1)
        );
        break;
    }
    setDataCorrente(nuovaData);
  };

  const aggiungiEvento = () => {
    if (!formEventoData) return;
    const nuovoEvento = {
      titolo: formTitolo,
      descrizione: formDescrizione,
      categoria: formCategoria,
    };
    setEventi((prev) => ({
      ...prev,
      [formEventoData]: [...(prev[formEventoData] || []), nuovoEvento],
    }));
    setFormEventoData(null);
    setFormTitolo("");
    setFormDescrizione("");
    setFormCategoria("Festività");
  };

  const aggiornaEvento = (
    data: string,
    index: number,
    evento: { titolo: string; descrizione: string; categoria: string }
  ) => {
    setEventi((prev) => {
      const eventiGiorno = [...(prev[data] || [])];
      eventiGiorno[index] = evento;
      return { ...prev, [data]: eventiGiorno };
    });
  };

  const eliminaEvento = (data: string, index: number) => {
    setEventi((prev) => {
      const eventiGiorno = [...(prev[data] || [])];
      eventiGiorno.splice(index, 1);
      return { ...prev, [data]: eventiGiorno };
    });
  };

  const [categorieDisponibili, setCategorieDisponibili] = useState([
    "Festività",
    "Lavoro",
    "Personale",
  ]);
  const [categorieAttive, setCategorieAttive] = useState([
    ...categorieDisponibili,
  ]);
  const [categoriaColori, setCategoriaColori] = useState<
    Record<string, string>
  >({
    Festività: "#fbbc05",
    Lavoro: "#4285f4",
    Personale: "#34a853",
  });
  const [categoriaIcone, setCategoriaIcone] = useState<
    Record<string, JSX.Element>
  >({
    Festività: <CalendarDays size={16} />,
    Lavoro: <Briefcase size={16} />,
    Personale: <PartyPopper size={16} />,
  });
  const [coloreCategoria, setColoreCategoria] = useState("#34a853");
  const [aggiuntaCategoria, setAggiuntaCategoria] = useState("");
  const [categorieRecenti, setCategorieRecenti] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);

  const toggleCategoria = (categoria: string) => {
    setCategorieAttive((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  };

  const selezionaTutte = () => {
    if (categorieAttive.length === categorieDisponibili.length) {
      setCategorieAttive([]);
    } else {
      setCategorieAttive([...categorieDisponibili]);
    }
  };

  const aggiungiCategoria = () => {
    const nuova = aggiuntaCategoria.trim();
    if (
      nuova.length > 0 &&
      !categorieDisponibili.includes(nuova) &&
      /^[\w\sàèéùìò]+$/i.test(nuova)
    ) {
      const nuovaLista = [...categorieDisponibili, nuova];
      setCategorieDisponibili(nuovaLista);
      setCategorieAttive([...categorieAttive, nuova]);

      const nuovaIcona = getIconaCategoria(nuova);
      setCategoriaIcone({
        ...categoriaIcone,
        [nuova]: nuovaIcona,
      });

      setCategoriaColori({
        ...categoriaColori,
        [nuova]: coloreCategoria,
      });

      setAggiuntaCategoria("");
      setColoreCategoria("#34a853");
      setShowInput(false);
    }
  };

  const handleToggle = (categoria: string) => {
    toggleCategoria(categoria);
    setCategorieRecenti((prev) => {
      const senza = prev.filter((c) => c !== categoria);
      return [categoria, ...senza];
    });
  };

  const coloriPredefiniti = [
    "#34a853",
    "#4285f4",
    "#fbbc05",
    "#ea4335",
    "#ab47bc",
    "#00acc1",
    "#ff7043",
  ];

  const giorni: (Date | null)[] = [];
  const anno = dataCorrente.getFullYear();
  const mese = dataCorrente.getMonth();
  const giorniMese = giorniNelMese(anno, mese);
  const primoGiorno = primoGiornoSettimana(anno, mese);
  for (let i = 0; i < primoGiorno; i++) giorni.push(null);
  for (let i = 1; i <= giorniMese; i++) giorni.push(new Date(anno, mese, i));

  return {
    dataCorrente,
    setDataCorrente,
    cambiaData,
    vista,
    setVista,
    eventi,
    setEventi,
    eventoSelezionato,
    setEventoSelezionato,
    formEventoData,
    setFormEventoData,
    formTitolo,
    setFormTitolo,
    formDescrizione,
    setFormDescrizione,
    formCategoria,
    setFormCategoria,
    aggiungiEvento,
    aggiornaEvento,
    eliminaEvento,
    formattaData,
    giorni,
    anno,
    mese,
    categorieDisponibili,
    setCategorieDisponibili,
    categorieAttive,
    setCategorieAttive,
    categoriaColori,
    setCategoriaColori,
    categoriaIcone,
    setCategoriaIcone,
    toggleCategoria,
    coloriPredefiniti,
    coloreCategoria,
    setColoreCategoria,
    aggiuntaCategoria,
    setAggiuntaCategoria,
    selezionaTutte,
    aggiungiCategoria,
    handleToggle,
    categorieRecenti,
    showInput,
    setShowInput,
  };
};

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useCalendar();
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
};
