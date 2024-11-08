// frontend/src/components/CustomCalendar.jsx
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteDailyLogsThunkById, getDailyLogsAllThunk } from '../../../redux/daylogs';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomCalendar = ({ value, width = '100%', height = '800px', handler }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(getDailyLogsAllThunk());
  }, [dispatch]);

  useEffect(() => {
    const userEvents = dayLogsArr
      .filter(log => log.userId === sessionUser?.id)
      .map(log => ({
        title: `${log.name}: ${log.calories}` || 'Event', 
        start: new Date(log.timestamp),
        end: new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000), // Assuming 1-hour events
        id: log.id,
      }));
    setEvents(userEvents);
  }, [dayLogsArr, sessionUser]);

  const handleSelectSlot = ({ start, end }) => {
    console.log(`...{ start, end} = , {${start}, ${end}}`)
  };

  const handleSelectEvent = (event) => {
    handler(event); // Pass the event as a parameter to the handler
  };
  




  //prevent events from overlapping in views
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color || '#3174ad',
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        fontSize: '0.8rem',
        padding: '2px',
        height: '18px',
        overflow: 'hidden',
      },
    };
  };

  const formats = {
    eventTimeRangeFormat: () => '', // Empty string hides time range for events
  };
  

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height, width }}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      views={['day', 'week', 'month']}
      defaultView="day"
      eventPropGetter={eventStyleGetter}
      formats={formats} 
      dayLayoutAlgorithm="no-overlap" 
    />
  );
};

export default CustomCalendar;



  // trying to incrase day to show more than 2 events in monthly view
  // const EventWrapper = ({ events = [] }) => {
  //   const displayedEvents = events.slice(0, 4);
  //   const extraCount = events.length > 4 ? events.length - 4 : 0;

  //   return (
  //     <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '2px' }}>
  //       {displayedEvents.map((event, idx) => (
  //         <div
  //           key={idx}
  //           style={{
  //             fontSize: '0.85rem',
  //           }}
  //         >
  //           {event.title}
  //         </div>
  //       ))}
  //       {extraCount > 0 && (
  //         <div style={{ fontStyle: 'italic', color: '#555' }}>
  //           +{extraCount} more
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  