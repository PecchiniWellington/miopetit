"use client";
import CalendarCells from "./brand-calendar/calendar-cells";
import { useCalendarContext } from "./brand-calendar/calendar-context";
import CalendarCreateEvent from "./brand-calendar/calendar-create-event";
import CalendarHeader from "./brand-calendar/calendar-header";
import CalendarShowEvent from "./brand-calendar/calendar-show-event";
import SideBarCalendar from "./brand-calendar/calendar-side-bar";

const CalendarioContent = () => {
  const giorniSettimana = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

  const {
    categoriaIcone,
    setCategoriaIcone,
    categorieDisponibili,
    setCategorieDisponibili,
    categorieAttive,
    setCategorieAttive,
    categoriaColori,
    setCategoriaColori,
    toggleCategoria,

    dataCorrente,
    anno,
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
    formattaData,
    giorni,
    aggiornaEvento,
    eliminaEvento,
  } = useCalendarContext();

  return (
    <div
      className="relative z-10"
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      {/* Sidebar */}
      <SideBarCalendar
        categoriaIcone={categoriaIcone}
        setCategoriaIcone={setCategoriaIcone}
        categorieDisponibili={categorieDisponibili}
        categorieAttive={categorieAttive}
        toggleCategoria={toggleCategoria}
        setCategorieDisponibili={setCategorieDisponibili}
        setCategorieAttive={setCategorieAttive}
        categoriaColori={categoriaColori}
        setCategoriaColori={setCategoriaColori}
      />

      {/* Calendario */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Header */}
        <CalendarHeader giorniSettimana={giorniSettimana} />

        {/* Giorni */}
        <CalendarCells
          giorni={giorni}
          formattaData={formattaData}
          categorieAttive={categorieAttive}
          eventi={eventi}
          setEventoSelezionato={setEventoSelezionato}
          setFormEventoData={setFormEventoData}
        />
      </div>

      {/* Popup visualizzazione evento */}
      {eventoSelezionato && (
        <CalendarShowEvent
          categorieDisponibili={categorieDisponibili}
          eventoSelezionato={eventoSelezionato}
          setEventoSelezionato={setEventoSelezionato}
          onEdit={aggiornaEvento}
          onDelete={eliminaEvento}
          onAdd={(data, evento) => {
            setEventi((prev) => ({
              ...prev,
              [data]: [...(prev[data] || []), evento],
            }));
          }}
        />
      )}

      {/* Popup creazione evento */}
      {formEventoData && (
        <CalendarCreateEvent
          formEventoData={formEventoData}
          setFormEventoData={setFormEventoData}
          formTitolo={formTitolo}
          setFormTitolo={setFormTitolo}
          formDescrizione={formDescrizione}
          setFormDescrizione={setFormDescrizione}
          formCategoria={formCategoria}
          setFormCategoria={setFormCategoria}
          categorieDisponibili={categorieDisponibili}
          aggiungiEvento={aggiungiEvento}
        />
      )}
    </div>
  );
};

export default CalendarioContent;
