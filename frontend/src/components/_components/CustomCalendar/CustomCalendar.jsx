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

import { useCallback } from 'react';

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
    console.log(`!!! Selected slot: Start = ${start}, End = ${end}`);
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

  const WeekdayHeader = ({ date }) => {
    return <div>{formatDate(date, 'EEEE')}</div>;
  };


  const formats = {
    weekdayFormat: (date) => formatDate(date, 'EEEE'),
    eventTimeRangeFormat: () => '',
  };

  const handleOnRangeChange = useCallback(
    (range) => {
      // console.log("..handleOnRangeChange..");

      // Log the incoming range and all events for debugging
      console.log("Range:", range);
      console.log("'events:'", events.map(event => ({
        title: event.title,
        start: event.start,
        end: event.end,
      })));

      let visibleEvents = [];
      if (Array.isArray(range)) { // Day & Week view
        const start = new Date(range[0]);
        const end = new Date(range[range.length - 1]);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        console.log("...A...")
        // console.log("...start = ", start)
        // console.log("...end = ", end)

        visibleEvents = events.filter(
          (event) => event.start <= end && event.end >= start
        );
      } else if (range.start && range.end) {          // For month view
        console.log("..B..")

        const start = new Date(range.start);
        const end = new Date(range.end);

        // Adjust to cover the entire day in local time
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        visibleEvents = events.filter((event) => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);

          // Check if the event falls within the range
          const isEventInRange =
            (eventStart >= start && eventStart <= end) ||  // Event starts within the range
            (eventEnd >= start && eventEnd <= end) ||      // Event ends within the range
            (eventStart <= start && eventEnd >= end);      // Event spans across the entire range

          return isEventInRange;
        });
      }
      console.log("Visible Events:", visibleEvents.map((event) => event.title));
    },
    [events]
  );

  // useEffect(() => {
  //   if (events.length > 0) {
  //     handleOnRangeChange({
  //       start: new Date(events[0].start),
  //       end: new Date(events[events.length - 1].end),
  //     });
  //   }
  // }, [events, handleOnRangeChange]);


  useEffect(() => {
    if (events.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setHours(23, 59, 59, 999);
      handleOnRangeChange({ start: today, end: tomorrow });
    }
  }, [events, handleOnRangeChange]);
  

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      style={{ height, width }}
      selectable  //alows select
      onSelectSlot={handleSelectSlot}   //click on time slot & not Event
      onSelectEvent={handleSelectEvent} //click on event inside time slot
      views={['day', 'week', 'month']}
      defaultView="day"
      eventPropGetter={eventStyleGetter} //css even styling
      formats={formats} //non-css-format of time/date data
      dayLayoutAlgorithm="no-overlap"
      scrollToTime={new Date(new Date().setHours(5, 0, 0, 0))}  //Will stop short of 5am if whole calendar is on page.
      components={{ //'component' overrides default
        week: { header: WeekdayHeader },
      }}
      step={15}
      onRangeChange={handleOnRangeChange}
    />
  );
};

export default CustomCalendar;
