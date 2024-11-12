// frontend/src/components/CustomCalendar.jsx
import { useRef } from 'react';
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

const colorArray = ["#eeeeaf", "#7accc8", "#f82927", "#68af2c", '#cdb4a0', "#f1a9c7", "#b8b8ff", "#20b2aa"]

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const CustomCalendar = ({ value, width = '100%', height = '1200px', handler }) => { // Adjusted height
  // const CustomCalendar = ({ value, width = '100%', height = '800px', handler }) => {

  const timeContentRef = useRef(null);
  const timeGutterRef = useRef(null);

  useEffect(() => {
    const syncGutterHeight = () => {
      if (timeContentRef.current && timeGutterRef.current) {
        const contentHeight = timeContentRef.current.getBoundingClientRect().height;
        timeGutterRef.current.style.height = `${contentHeight}px`;
      }
    };
    syncGutterHeight();
    window.addEventListener("resize", syncGutterHeight);
    return () => window.removeEventListener("resize", syncGutterHeight);
  }, []);



  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(getDailyLogsAllThunk());
  }, [dispatch]);

  const newDate = log => {
    if (log?.Workout) {
      const workoutType = String(log.unitType).toLowerCase()
      const workoutUnits = Number(log.units)
      switch (workoutType) {
        case "minutes":
          return new Date(new Date(log.timestamp).getTime() + 60 * workoutUnits * 1000)
        case "hours":
          return new Date(new Date(log.timestamp).getTime() + 60 * workoutUnits * 60 * 1000)
        default:
          return new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000)
      }
    } else {
      // console.log(".........GRUB !!!1")
      return new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000)
    }
  }

  const newColor = event => {
    //colorArray
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  useEffect(() => {
    const userEvents = dayLogsArr
      .filter(log => log.userId === sessionUser?.id)
      .map(log => ({
        title: `${log.name}: ${log.calories}` || 'Event',
        start: new Date(log.timestamp),
        end: newDate(log),  // calculate the ending Time for event
        id: log.id,
        color: newColor()
      }));
    setEvents(userEvents);
  }, [dayLogsArr, sessionUser.id]);

  const handleSelectSlot = ({ start, end }) => {
    console.log(`...{ start, end} = , {${start}, ${end}}`)
  };

  const handleSelectEvent = (event) => {
    handler(event); // Pass the event as a parameter to the handler
  };



  //prevent events from overlapping in views
  const eventStyleGetter = (event) => {
    // console.log('...event = ', event)
    return {
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
    };
  };

  const formats = {
    eventTimeRangeFormat: () => '', // Empty string hides time range for events
  };

  useEffect(() => {
    const adjustHeights = () => {
      if (timeContentRef.current && timeGutterRef.current) {
        const contentHeight = timeContentRef.current.scrollHeight;
        timeGutterRef.current.style.height = `${contentHeight}px`;
      }
    };
    
    adjustHeights();
    window.addEventListener("resize", adjustHeights);
    return () => window.removeEventListener("resize", adjustHeights);
  }, []);
  

  
  // return (
  //   <BigCalendar
  //     localizer={localizer}
  //     events={events}
  //     startAccessor="start"
  //     endAccessor="end"
  //     style={{ height, width }}
  //     selectable
  //     onSelectSlot={handleSelectSlot}
  //     onSelectEvent={handleSelectEvent}
  //     views={['day', 'week', 'month']}
  //     defaultView="day"
  //     eventPropGetter={eventStyleGetter}
  //     formats={formats}
  //     dayLayoutAlgorithm="no-overlap"
  //   />
  // );

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ width }} // Only set width, no fixed height
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      views={['day', 'week', 'month']}
      defaultView="day"
      eventPropGetter={eventStyleGetter}
      formats={formats}
      dayLayoutAlgorithm="no-overlap"
      components={{
        timeGutterHeader: (props) => <div ref={timeGutterRef} {...props} />,
        timeContent: (props) => <div ref={timeContentRef} {...props} />,
      }}
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
