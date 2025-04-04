"use client";

import {
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CalendarHeader = ({ giorniSettimana }: { giorniSettimana: string[] }) => {
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
          >
            Oggi
          </button>
          <ChevronLeft size={18} color="#ccc" style={{ cursor: "pointer" }} />
          <ChevronRight size={18} color="#ccc" style={{ cursor: "pointer" }} />
          <span style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>
            Aprile 2025
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              color: "#ccc",
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              border: "1px solid #333",
              padding: "4px 10px",
              borderRadius: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>Mese</span>
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#303134",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <button
              style={{
                backgroundColor: "#3a3a3a",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
              }}
            >
              <CalendarDays size={16} />
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: "#aaa",
                border: "none",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
              }}
            >
              <CheckCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Header giorni della settimana */}
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
    </div>
  );
};

export default CalendarHeader;
