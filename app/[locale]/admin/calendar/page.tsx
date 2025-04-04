"use client";
import { CalendarProvider } from "./brand-calendar/calendar-context";
import CalendarioContent from "./calendario-content";

export default function CalendarPage() {
  return (
    <CalendarProvider>
      <CalendarioContent />
    </CalendarProvider>
  );
}
