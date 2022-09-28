import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    if (calendarEvent.id) {
      // Actualizando evento existente
      dispatch(onUpdateEvent({...calendarEvent}))
    } else {
      // Creando nuevo evento, simulamos el _id del backend
      const {data} = await calendarApi.post('/events', calendarEvent);
      dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user }) );
    }
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  }

  return {
    //* Props
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
