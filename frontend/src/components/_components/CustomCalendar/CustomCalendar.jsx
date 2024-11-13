// frontend/src/components/CustomCalendar.jsx
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';
import { format as formatDate } from 'date-fns';

import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyLogsAllThunk } from '../../../redux/daylogs';

const colorArray = ["#eeeeaf", "#7accc8", "#f82927", "#68af2c", '#cdb4a0', "#f1a9c7", "#b8b8ff", "#20b2aa"];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const CustomCalendar = ({ width = '100%', height = '1200px', handler }) => {
  const timeContentRef = useRef(null);
  const timeGutterRef = useRef(null);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(getDailyLogsAllThunk());
  }, [dispatch]);

  const newDate = log => {
    if (log?.Workout) {
      const workoutType = String(log.unitType).toLowerCase();
      const workoutUnits = Number(log.units);
      switch (workoutType) {
        case "minutes":
          return new Date(new Date(log.timestamp).getTime() + 60 * workoutUnits * 1000);
        case "hours":
          return new Date(new Date(log.timestamp).getTime() + 60 * workoutUnits * 60 * 1000);
        default:
          return new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000);
      }
    } else {
      return new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000);
    }
  };

  const newColor = () => colorArray[Math.floor(Math.random() * colorArray.length)];

  useEffect(() => {
    const userEvents = dayLogsArr
      .filter(log => log.userId === sessionUser?.id)
      .map(log => ({
        title: `${log.name}: ${log.calories}` || 'Event',
        start: new Date(log.timestamp),
        end: newDate(log),
        id: log.id,
        color: newColor()
      }));
    setEvents(userEvents);
  }, [dayLogsArr, sessionUser.id]);

  const handleSelectSlot = ({ start, end }) => {
    console.log(`Selected slot: Start = ${start}, End = ${end}`);
  };

  const handleSelectEvent = (event) => {
    handler(event);
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      fontSize: '0.8rem',
      padding: '2px',
      height: '18px',
      overflow: 'hidden',
    },
  });

  // const WeekdayHeader = ({ label }) => {
  //   return <div>{label}</div>;
  // };
  
  const WeekdayHeader = ({ date }) => {
  return <div>{formatDate(date, 'EEEE')}</div>;
};


  const formats = {
    weekdayFormat: (date) => formatDate(date, 'EEEE'), 
    eventTimeRangeFormat: () => '', // Hide time range for events
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
      components={{
        week: { header: WeekdayHeader }, // Use custom header component for week view
      }}
    />
  );
};

export default CustomCalendar;
