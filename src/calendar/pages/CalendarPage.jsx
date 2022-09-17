import { addHours } from 'date-fns';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal} from '../';

import { localizer, getMessagesES } from '../../helpers';

const events =   [{  
  title: 'Ver One-Piece',
  notes: 'Ya van 4 capítulos de humo.',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'SkillFactory'
  }
}];

export const CalendarPage = () => {

  
  // Seteamos una vista por default, utilizamos localStorage.
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  // Esta funcion la seteamos en el calendario y es donde podemos capturar los eventos del mismo.
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // Mirar el clg.
    // console.log({event, start, end, isSelected})

    // Podemos cambiar el estilo del evento creado.
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  
  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event });
    
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
    
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }



  return (
    <>
      <Navbar />

      <Calendar
        // En culture, seteamos el idioma. Si lo cambiamos de 'es' a 'en' lo veremos en ingles.
        culture='es'
        // Localizer lo exportamos desde calendarLocalizer.
        localizer={ localizer }
        events={ events }
        // vista por default, la caual almacenamos en el localStorage.
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        // En messages aplicamos la funcion para la traduccion de los botones.
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        // En components pasamos el componente que mostrara el evento generado.
        components={{
          event: CalendarEvent
        }}
        // Seteamos funciones que se ejecutaran en determinados eventos.
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        // Vistas del calendario (Mes, Semana, Dia, Agenda)
        onView={ onViewChanged }
      />


      <CalendarModal />
           

    </>
  )
}
