"use client";

import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useCalendarContext } from "./calendar-context";

const CalendarHeader = ({ giorniSettimana }: { giorniSettimana: string[] }) => {
  const { dataCorrente, cambiaData, vista, setVista, vaiAggi } =
    useCalendarContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formattaTitolo = () => {
    const opzioni: Intl.DateTimeFormatOptions =
      vista === "year"
        ? { year: "numeric" }
        : vista === "month"
          ? { month: "long", year: "numeric" }
          : vista === "week" || vista === "day"
            ? { day: "numeric", month: "long", year: "numeric" }
            : {};

    return dataCorrente.toLocaleDateString("it-IT", opzioni);
  };

  const dropdownStyle = {
    position: "absolute" as const,
    right: 0,
    top: "100%",
    backgroundColor: "#2d2d2d",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: 6,
    marginTop: 4,
    minWidth: 120,
    zIndex: 100,
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {/* Barra superiore di navigazione */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1f1f1f",
          padding: "12px 16px",
          borderBottom: "1px solid #333",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={{
              backgroundColor: "#2d2d2d",
              border: "1px solid #444",
              borderRadius: 20,
              padding: "4px 14px",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
            onClick={vaiAggi}
          >
            Oggi
          </button>
          <ChevronLeft
            size={18}
            color="#ccc"
            style={{ cursor: "pointer" }}
            onClick={() => cambiaData("indietro")}
          />
          <ChevronRight
            size={18}
            color="#ccc"
            style={{ cursor: "pointer" }}
            onClick={() => cambiaData("avanti")}
          />
          <span style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>
            {formattaTitolo()}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "#303134",
              border: "1px solid #444",
              padding: "6px 12px",
              borderRadius: 8,
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <LayoutGrid size={16} />
            <span>
              {vista === "day"
                ? "Giorno"
                : vista === "week"
                  ? "Settimana"
                  : vista === "month"
                    ? "Mese"
                    : "Anno"}
            </span>
          </button>

          {dropdownOpen && (
            <div style={dropdownStyle}>
              {[
                { key: "day", label: "Giorno" },
                { key: "week", label: "Settimana" },
                { key: "month", label: "Mese" },
                { key: "year", label: "Anno" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => {
                    setVista(key);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: vista === key ? "#444" : "transparent",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Header giorni della settimana */}
      {vista !== "year" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            color: "#aaa",
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          {giorniSettimana.map((g) => (
            <div key={g}>{g}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarHeader;
