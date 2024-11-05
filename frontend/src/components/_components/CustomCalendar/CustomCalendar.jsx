// frontend/src/components/CustomCalendar.jsx
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDailyLogsAllThunk } from '../../../redux/daylogs';

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

const CustomCalendar = ({ width = '100%', height = '800px' }) => {
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
        title: log.title || 'Event', // Customize as per your data
        start: new Date(log.timestamp),
        end: new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000), // Assuming 1-hour events
        id: log.id,
      }));
    setEvents(userEvents);
  }, [dayLogsArr, sessionUser]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter event title');
    if (title) {
      setEvents([...events, { title, start, end }]);
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm(`Would you like to remove the event: ${event.title}?`)) {
      // Dispatch action to delete event from your Redux store
      setEvents(events.filter(e => e.id !== event.id));
    }
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
    />
  );
};

export default CustomCalendar;
