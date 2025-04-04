"use client";

import { useCalendarContext } from "./calendar-context";

const CalendarCells = ({
  giorni,
  formattaData,
  categorieAttive,
  eventi,
  setEventoSelezionato,
  setFormEventoData,
  view = "year",
}: any) => {
  const { setEventi, categoriaColori } = useCalendarContext();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dataStr: string) => {
    const json = e.dataTransfer.getData("application/json");
    const { titolo, descrizione, categoria, origine } = JSON.parse(json);

    if (!origine || origine === dataStr) return;

    setEventi((prev: any) => {
      const nuovi = { ...prev };
      nuovi[origine] = (nuovi[origine] || []).filter(
        (ev: any) =>
          ev.titolo !== titolo ||
          ev.descrizione !== descrizione ||
          ev.categoria !== categoria
      );
      nuovi[dataStr] = [
        ...(nuovi[dataStr] || []),
        { titolo, descrizione, categoria },
      ];
      return nuovi;
    });
  };

  let gridCols = 7;
  let giorniRender = giorni;
  let cellStyle: React.CSSProperties = {
    minHeight: "90px",
    border: "1px solid #3a3a3a",
    backgroundColor: "#2a2a2a",
    padding: 6,
    fontSize: 12,
    cursor: "pointer",
    position: "relative",
  };

  if (view === "day") {
    gridCols = 1;
    giorniRender = giorni.filter(
      (d: Date | null) =>
        d !== null && d.getDate() === giorni[giorni.length - 1]?.getDate()
    );
    cellStyle = {
      minHeight: "1200px",
      backgroundColor: "#1e1e1e",
      borderLeft: "1px solid #3a3a3a",
      position: "relative",
      padding: 0,
    };
  } else if (view === "week") {
    gridCols = 7;
    giorniRender = giorni.slice(0, 7);
    cellStyle = {
      minHeight: "1000px",
      backgroundColor: "#1e1e1e",
      borderLeft: "1px solid #3a3a3a",
      borderRight: "1px solid #3a3a3a",
      position: "relative",
      padding: 0,
    };
  } else if (view === "year") {
    gridCols = 4;
    giorniRender = Array.from({ length: 12 }, (_, m) => {
      const giorniMese = new Date(2025, m + 1, 0).getDate();
      return Array.from(
        { length: giorniMese },
        (_, d) => new Date(2025, m, d + 1)
      );
    });
    cellStyle = {
      minHeight: "200px",
      border: "1px solid #3a3a3a",
      backgroundColor: "#2a2a2a",
      padding: 10,
      fontSize: 12,
    };
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gap: 1,
      }}
    >
      {view === "year"
        ? giorniRender.map((mese: Date[], index: number) => (
            <div
              key={index}
              style={{
                ...cellStyle,
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gridGap: 2,
              }}
            >
              <div
                style={{
                  gridColumn: "span 7",
                  textAlign: "center",
                  color: "#ccc",
                  marginBottom: 4,
                }}
              >
                {mese[0].toLocaleString("it-IT", { month: "long" })}
              </div>
              {mese.map((data: Date, i: number) => {
                const dataStr = formattaData(data);
                const eventiGiorno = (eventi[dataStr] || []).filter((ev: any) =>
                  categorieAttive.includes(ev.categoria)
                );
                return (
                  <div
                    key={i}
                    style={{
                      fontSize: 10,
                      color: "#eee",
                      position: "relative",
                      padding: 2,
                      borderRadius: 4,
                    }}
                  >
                    {data.getDate()}
                    {eventiGiorno.length > 0 && (
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 2,
                          backgroundColor: "#34a853",
                          borderRadius: "50%",
                          width: 14,
                          height: 14,
                          fontSize: 10,
                          color: "#fff",
                          textAlign: "center",
                          lineHeight: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {eventiGiorno.length}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        : giorniRender.map((data: any, index: number) => {
            const dataStr = data ? formattaData(data) : "";
            const eventiGiorno = (eventi[dataStr] || []).filter(
              (ev: { categoria: string }) =>
                categorieAttive.includes(ev.categoria)
            );
            const eventiMostrati = eventiGiorno.slice(0, 4);
            const eventiExtra = eventiGiorno.length - eventiMostrati.length;

            return (
              <div
                key={index}
                onDrop={(e) => handleDrop(e, dataStr)}
                onDragOver={(e) => e.preventDefault()}
                style={cellStyle}
                onClick={() =>
                  eventiGiorno.length > 0
                    ? setEventoSelezionato({
                        data: dataStr,
                        eventi: eventiGiorno,
                      })
                    : setFormEventoData(dataStr)
                }
              >
                {eventiExtra > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      backgroundColor: "#444",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      zIndex: 10,
                    }}
                  >
                    +{eventiExtra}
                  </div>
                )}

                {data && (
                  <>
                    <div
                      style={{
                        textAlign: "right",
                        color: "#ccc",
                        padding: view === "year" ? 0 : 4,
                        fontWeight: "bold",
                      }}
                    >
                      {view === "year"
                        ? data.toLocaleString("it-IT", { month: "long" })
                        : data.getDate()}
                    </div>
                    {eventiMostrati.map((ev: any, i: number) => (
                      <div
                        key={i}
                        draggable
                        onDragStart={(e) =>
                          e.dataTransfer.setData(
                            "application/json",
                            JSON.stringify({ ...ev, origine: dataStr })
                          )
                        }
                        style={{
                          backgroundColor:
                            categoriaColori[ev.categoria] || "#34a853",
                          color: "#fff",
                          borderRadius: 4,
                          padding: "2px 4px",
                          marginTop: 4,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          userSelect: "none",
                          cursor: "grab",
                          transition: "background 0.2s",
                        }}
                      >
                        {ev.titolo}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
    </div>
  );
};

export default CalendarCells;
