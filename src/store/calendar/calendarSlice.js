import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const tempEvents =   {
//     id: new Date().getTime(),
//     title: 'Ver One-Piece',
//     notes: 'Ya van 4 capítulos de humo.',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       id: '123',
//       name: 'SkillFactory'
//     }
//   };

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, {payload}) => {
      payload.forEach(event => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id);
        if( !exists ) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;
