"use client";

import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCalendarContext } from "./calendar-context";

const CalendarCreateEvent = () => {
  const {
    formTitolo,
    setFormTitolo,
    formEventoData,
    setFormEventoData,
    formCategoria,
    categorieDisponibili,
    setFormCategoria,
    aggiungiEvento,
    formDescrizione,
    setFormDescrizione,
  } = useCalendarContext();

  const [activeTab, setActiveTab] = useState<"evento" | "attivita">("evento");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("15:00");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [invitees, setInvitees] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setFormEventoData(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setFormEventoData]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: 400,
          backgroundColor: "#1e1e1e",
          color: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <input
          placeholder="Aggiungi titolo e orario"
          value={formTitolo}
          onChange={(e) => setFormTitolo(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 8px",
            fontSize: 16,
            backgroundColor: "transparent",
            color: "#fff",
            border: "none",
            borderBottom: "1px solid #444",
            marginBottom: 12,
          }}
        />

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button
            onClick={() => setActiveTab("evento")}
            style={{
              flex: 1,
              backgroundColor: activeTab === "evento" ? "#3c82f6" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Evento
          </button>
          <button
            onClick={() => setActiveTab("attivita")}
            style={{
              flex: 1,
              backgroundColor: activeTab === "attivita" ? "#3c82f6" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Attività
          </button>
        </div>

        <div
          style={{
            fontSize: 13,
            marginBottom: 12,
            color: "#ccc",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CalendarDays size={14} style={{ marginRight: 6 }} />
          {formEventoData} –
          <button
            onClick={() => setShowDatePicker(true)}
            style={{
              marginLeft: 8,
              backgroundColor: "#333",
              border: "none",
              padding: "4px 8px",
              borderRadius: 4,
              color: "#fff",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Cambia data
          </button>
        </div>

        {showDatePicker && (
          <input
            type="date"
            onChange={(e) => {
              setFormEventoData(e.target.value);
              setShowDatePicker(false);
            }}
            style={{
              marginBottom: 12,
              backgroundColor: "#111",
              color: "#fff",
              border: "1px solid #444",
              padding: 6,
              borderRadius: 6,
              width: "100%",
            }}
          />
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Clock
              size={14}
              style={{ position: "absolute", top: 10, left: 10, color: "#aaa" }}
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 6px 6px 28px",
                backgroundColor: "#111",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: 6,
              }}
            />
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <Clock
              size={14}
              style={{ position: "absolute", top: 10, left: 10, color: "#aaa" }}
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 6px 6px 28px",
                backgroundColor: "#111",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: 6,
              }}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Aggiungi invitati (email)"
          value={invitees}
          onChange={(e) => setInvitees(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 12,
            backgroundColor: "#111",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: 6,
          }}
        />

        <input
          type="file"
          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
          style={{ marginBottom: 12, color: "#ccc" }}
        />

        <textarea
          placeholder="Aggiungi descrizione"
          value={formDescrizione}
          onChange={(e) => setFormDescrizione(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: 6,
            border: "1px solid #444",
            minHeight: 60,
            marginBottom: 12,
          }}
        />

        <select
          value={formCategoria}
          onChange={(e) => setFormCategoria(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            backgroundColor: "#111",
            color: "#fff",
            border: "1px solid #444",
            marginBottom: 16,
          }}
        >
          {categorieDisponibili.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#aaa",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Altre opzioni
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setFormEventoData(null)}
              style={{
                backgroundColor: "#444",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 6,
                border: "none",
              }}
            >
              Annulla
            </button>
            <button
              onClick={aggiungiEvento}
              disabled={!formTitolo.trim()}
              style={{
                backgroundColor: "#3c82f6",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 6,
                border: "none",
                opacity: !formTitolo.trim() ? 0.6 : 1,
                cursor: !formTitolo.trim() ? "not-allowed" : "pointer",
              }}
            >
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCreateEvent;
