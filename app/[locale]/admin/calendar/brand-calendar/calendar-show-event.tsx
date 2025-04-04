"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Tipi
interface Evento {
  titolo: string;
  descrizione: string;
  categoria: string;
}

interface CalendarShowEventProps {
  eventoSelezionato: {
    data: string;
    eventi: Evento[];
  };
  setEventoSelezionato: (val: null) => void;
  onEdit: (data: string, index: number, evento: Evento) => void;
  onDelete: (data: string, index: number) => void;
  onAdd: (data: string, evento: Evento) => void;
  categorieDisponibili: string[];
}

// Mappa colori ed emoji per categoria
const categoriaColori: Record<string, string> = {
  Festività: "#facc15",
  Lavoro: "#60a5fa",
  Personale: "#34d399",
  Sport: "#f87171",
  Viaggio: "#f472b6",
};

const categoriaEmoji: Record<string, string> = {
  Festività: "🎉",
  Lavoro: "💼",
  Personale: "🧘",
  Sport: "🏃",
  Viaggio: "✈️",
};

// Helpers
const getColoreCategoria = (cat: string) => categoriaColori[cat] ?? "#9ca3af";
const getEmojiCategoria = (cat: string) => categoriaEmoji[cat] ?? "📌";

const CalendarShowEvent = ({
  eventoSelezionato,
  setEventoSelezionato,
  onEdit,
  onDelete,
  onAdd,
  categorieDisponibili,
}: CalendarShowEventProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Evento>({
    titolo: "",
    descrizione: "",
    categoria: categorieDisponibili[0],
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ block: "center" });
    }
  }, [editingIndex, isAdding]);

  if (!eventoSelezionato) return null;

  const startEdit = (evento: Evento, index: number) => {
    setEditingIndex(index);
    setForm(evento);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setForm({
      titolo: "",
      descrizione: "",
      categoria: categorieDisponibili[0],
    });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      onEdit(eventoSelezionato.data, editingIndex, form);
      cancelEdit();
    } else if (isAdding) {
      onAdd(eventoSelezionato.data, form);
      setIsAdding(false);
      setForm({
        titolo: "",
        descrizione: "",
        categoria: categorieDisponibili[0],
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1000,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <div
          ref={modalRef}
          style={{
            backgroundColor: "#1f1f1f",
            color: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            📅 Eventi del{" "}
            <span style={{ color: "#4ade80" }}>{eventoSelezionato.data}</span>
          </h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {eventoSelezionato.eventi.map((evento, idx) => (
              <li
                key={idx}
                style={{
                  backgroundColor: "#2b2b2b",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                {editingIndex === idx ? (
                  <EventForm
                    form={form}
                    onChange={handleInputChange}
                    onSave={handleSave}
                    onCancel={cancelEdit}
                    categorieDisponibili={categorieDisponibili}
                  />
                ) : (
                  <>
                    <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
                      {getEmojiCategoria(evento.categoria)} {evento.titolo}
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        marginBottom: "8px",
                        lineHeight: 1.5,
                      }}
                    >
                      {evento.descrizione}
                    </p>
                    <span
                      style={{
                        fontSize: "14px",
                        color: getColoreCategoria(evento.categoria),
                        backgroundColor: "#3f3f46",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {getEmojiCategoria(evento.categoria)} {evento.categoria}
                    </span>
                    <div
                      style={{
                        marginTop: "12px",
                        textAlign: "right",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={buttonStyle("#2563eb")}
                        onClick={() => startEdit(evento, idx)}
                      >
                        ✏️ Modifica
                      </button>
                      <button
                        style={buttonStyle("#dc2626")}
                        onClick={() => onDelete(eventoSelezionato.data, idx)}
                      >
                        🗑️ Elimina
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {isAdding ? (
            <EventForm
              form={form}
              onChange={handleInputChange}
              onSave={handleSave}
              onCancel={() => {
                setIsAdding(false);
                setForm({
                  titolo: "",
                  descrizione: "",
                  categoria: categorieDisponibili[0],
                });
              }}
              categorieDisponibili={categorieDisponibili}
            />
          ) : (
            <button
              style={{
                ...buttonStyle("#22c55e"),
                width: "100%",
                marginTop: "20px",
              }}
              onClick={() => {
                setIsAdding(true);
                setForm({
                  titolo: "",
                  descrizione: "",
                  categoria: categorieDisponibili[0],
                });
                setEditingIndex(null);
              }}
            >
              ➕ Aggiungi nuovo evento
            </button>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <button
              style={buttonStyle("#6b7280")}
              onClick={() => setEventoSelezionato(null)}
            >
              ❌ Chiudi
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// 🧩 Componente riutilizzabile per Form
const EventForm = ({
  form,
  onChange,
  onSave,
  onCancel,
  categorieDisponibili,
}: {
  form: Evento;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSave: () => void;
  onCancel: () => void;
  categorieDisponibili: string[];
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <input
      name="titolo"
      value={form.titolo}
      onChange={onChange}
      placeholder="Titolo"
      style={inputStyle}
    />
    <textarea
      name="descrizione"
      value={form.descrizione}
      onChange={onChange}
      placeholder="Descrizione"
      rows={3}
      style={{ ...inputStyle, resize: "vertical" }}
    />
    <select
      name="categoria"
      value={form.categoria}
      onChange={onChange}
      style={{
        ...inputStyle,
        appearance: "none",
        cursor: "pointer",
      }}
    >
      {categorieDisponibili.map((cat) => (
        <option key={cat} value={cat}>
          {getEmojiCategoria(cat)} {cat}
        </option>
      ))}
    </select>
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <button style={buttonStyle("#22c55e")} onClick={onSave}>
        💾 Salva
      </button>
      <button style={buttonStyle("#6b7280")} onClick={onCancel}>
        Annulla
      </button>
    </div>
  </div>
);

// Stili condivisi
const inputStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#2b2b2b",
  color: "#fff",
  fontSize: "16px",
};

const buttonStyle = (bg: string): React.CSSProperties => ({
  padding: "10px 16px",
  backgroundColor: bg,
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
});

export default CalendarShowEvent;
