"use client";
import React from "react";

import { useCalendarContext } from "./calendar-context";

const SideBarCalendar = ({
  ordinamento = "alfabetico",
}: {
  ordinamento?: "alfabetico" | "uso";
}) => {
  const {
    categoriaColori,
    setCategoriaColori,
    categorieDisponibili,
    categorieAttive,
    toggleCategoria,
    setCategorieDisponibili,
    setCategorieAttive,
    categoriaIcone,
    setCategoriaIcone,
    aggiuntaCategoria,
    setAggiuntaCategoria,
    selezionaTutte,
    aggiungiCategoria,
    coloreCategoria,
    setColoreCategoria,
    handleToggle,
    categorieRecenti,
    getIconaCategoria,
    showInput,
    setShowInput,
  } = useCalendarContext();

  const [searchTerm, setSearchTerm] = React.useState("");

  const categorieOrdinate = [...categorieDisponibili]
    .filter((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (ordinamento === "uso") {
        const aIndex = categorieRecenti.indexOf(a);
        const bIndex = categorieRecenti.indexOf(b);
        return (
          (bIndex === -1 ? Infinity : bIndex) -
          (aIndex === -1 ? Infinity : aIndex)
        );
      }
      return a.localeCompare(b);
    });

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#202124",
        padding: "24px 16px",
        borderRight: "1px solid #333",
        display: "flex",
        flexDirection: "column",
        color: "#eee",
      }}
    >
      <h2
        style={{
          fontSize: 18,
          marginBottom: 20,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        🎯 Categorie
      </h2>

      <input
        type="text"
        placeholder="Cerca categoria"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: 6,
          borderRadius: 6,
          border: "1px solid #444",
          backgroundColor: "#111",
          color: "#fff",
          marginBottom: 12,
        }}
      />

      <button
        onClick={selezionaTutte}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#303134",
          padding: "6px 12px",
          borderRadius: 6,
          border: "none",
          color: "#fff",
          fontSize: 13,
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        {categorieAttive.length === categorieDisponibili.length
          ? "Deseleziona tutte"
          : "Seleziona tutte"}
      </button>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {categorieOrdinate.map((categoria) => {
          const attiva = categorieAttive.includes(categoria);
          const icona =
            categoriaIcone[categoria] || getIconaCategoria(categoria);

          return (
            <li
              key={categoria}
              onClick={() => handleToggle(categoria)}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: attiva ? "#303134" : "transparent",
                padding: "10px 12px",
                borderRadius: 6,
                cursor: "pointer",
                marginBottom: 6,
                transition: "background 0.2s",
              }}
            >
              <input
                type="checkbox"
                checked={attiva}
                readOnly
                style={{
                  marginRight: 10,
                  accentColor: "#34a853",
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: categoriaColori[categoria] || "#666",
                  marginRight: 10,
                  flexShrink: 0,
                }}
              />
              {icona}
              <span style={{ marginLeft: 8, fontSize: 14 }}>{categoria}</span>
              <input
                type="color"
                value={categoriaColori[categoria] || "#34a853"}
                onChange={(e) =>
                  setCategoriaColori({
                    ...categoriaColori,
                    [categoria]: e.target.value,
                  })
                }
                style={{
                  marginLeft: "auto",
                  width: 22,
                  height: 22,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
            </li>
          );
        })}
      </ul>

      {/* Nuova categoria */}
      <div style={{ marginTop: 24 }}>
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            style={{
              backgroundColor: "#303134",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              display: "flex",
              alignItems: "center",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            ➕ Aggiungi categoria
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="text"
              placeholder="Nuova categoria"
              value={aggiuntaCategoria}
              onChange={(e) => setAggiuntaCategoria(e.target.value)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "#fff",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 13 }}>Colore:</label>
              <input
                type="color"
                value={coloreCategoria}
                onChange={(e) => setColoreCategoria(e.target.value)}
                style={{
                  marginLeft: "auto",
                  width: 22,
                  height: 22,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: 12, color: "#ccc" }}>
                {coloreCategoria}
              </span>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={aggiungiCategoria}
                style={{
                  backgroundColor: "#34a853",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Salva
              </button>
              <button
                onClick={() => {
                  setAggiuntaCategoria("");
                  setColoreCategoria("#34a853");
                  setShowInput(false);
                }}
                style={{
                  backgroundColor: "#555",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Annulla
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBarCalendar;
