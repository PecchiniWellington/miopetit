"use client";
import React, { createContext, useContext } from "react";
import { useCalendar } from "./useCalendar";

const CalendarContext = createContext<ReturnType<typeof useCalendar> | null>(
  null
);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
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
