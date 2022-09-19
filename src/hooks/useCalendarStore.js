import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend

    if (calendarEvent._id) {
      // Actualizando evento existente
    } else {
      // Creando nuevo evento, simulamos el _id del backend
      dispatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime()}) )
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
  };
};