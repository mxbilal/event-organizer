import { createContext, useState } from "react";

export const EventIdContext = createContext();

export const EventId = ({ children }) => {
  const [eventId, setEventId] = useState("1");
  return (
    <EventIdContext.Provider value={[eventId, setEventId]}>
      {children}
    </EventIdContext.Provider>
  );
};
