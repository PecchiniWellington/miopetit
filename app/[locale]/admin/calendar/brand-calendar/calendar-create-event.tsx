/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
const CalendarCreateEvent = ({
  formTitolo,
  setFormTitolo,
  formEventoData,
  formCategoria,
  categorieDisponibili,
  setFormCategoria,
  setFormEventoData,
  aggiungiEvento,
  formDescrizione,
  setFormDescrizione,
}: any) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#222",
        color: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        zIndex: 1000,
        minWidth: 320,
      }}
    >
      <h3 style={{ marginBottom: 12 }}>Nuovo evento – {formEventoData}</h3>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Titolo"
          value={formTitolo}
          onChange={(e) => setFormTitolo(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #555",
            backgroundColor: "#111",
            color: "#fff",
          }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <textarea
          placeholder="Descrizione"
          value={formDescrizione}
          onChange={(e) => setFormDescrizione(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #555",
            backgroundColor: "#111",
            color: "#fff",
          }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <select
          value={formCategoria}
          onChange={(e) => setFormCategoria(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            backgroundColor: "#111",
            color: "#fff",
            border: "1px solid #555",
          }}
        >
          {categorieDisponibili.map((cat: any) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => setFormEventoData(null)}
          style={{
            backgroundColor: "#555",
            padding: "6px 12px",
            borderRadius: 4,
            color: "#fff",
            border: "none",
          }}
        >
          Annulla
        </button>
        <button
          onClick={aggiungiEvento}
          style={{
            backgroundColor: "#34a853",
            padding: "6px 12px",
            borderRadius: 4,
            color: "#fff",
            border: "none",
          }}
          disabled={!formTitolo.trim()}
        >
          Salva
        </button>
      </div>
    </div>
  );
};

export default CalendarCreateEvent;
