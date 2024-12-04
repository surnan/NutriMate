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
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyLogsAllThunk } from '../../../redux/daylogs';
import { useNavigate } from 'react-router-dom';

const colorArray = ["#eeeeaf", "#7accc8", "#f82927", "#68af2c", '#cdb4a0', "#f1a9c7", "#b8b8ff", "#20b2aa"];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});


const CustomCalendar = ({ width = '100%', height = '1200px', onChange, handler, setTotals, defaultStartTime }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

  const nav = useNavigate()

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(getDailyLogsAllThunk());
  }, [dispatch]);

  const newDate = log => {
    if (log?.Workout) {
      //Input = Workout.units & Workout.unitTypes 
      //Output = Calculate "End-Time" for Big-Calendar
      const workoutType = String(log.unitType).toLowerCase(); //{minutes, hours, reps}
      const workoutUnits = Number(log.units);

      switch (workoutType) {
        case "minutes":
          return new Date(new Date(log.timestamp).getTime() + 60 * workoutUnits * 1000);
        case "hours":
          return new Date(new Date(log.timestamp).getTime() + 60 * workoutUnits * 60 * 1000);
        default:
      }
    }
    return new Date(new Date(log.timestamp).getTime() + 60 * 60 * 1000);
  };

  const newColor = () => colorArray[Math.floor(Math.random() * colorArray.length)];

  //calendar is fully populated at loadup
  useEffect(() => {
    const userEvents = [];
    for (let i = 0; i < dayLogsArr.length; i++) {
      const log = dayLogsArr[i];
      if (log.userId === sessionUser?.id) {
        userEvents.push({
          title: `${log.name}: ${log.calories}` || 'Event',
          start: new Date(log.timestamp),
          end: newDate(log),
          id: log.id,
          color: newColor(),
          fats: log?.Grub?.fats || 0,
          carbs: log?.Grub?.carbs || 0,
          protein: log?.Grub?.protein || 0,
          sugar: log?.Grub?.sugar || 0,
          calories: log.calories || 0,
          isWorkout: log?.Workout ? true : false
        });
      }
    }

    setEvents(userEvents);
  }, [dayLogsArr, sessionUser.id]);

  const handleOnRangeChange = useCallback(
    (range) => {
      let visibleEvents = [];

      let newTotalCalorie = 0;
      let newTotalProtein = 0;
      let newTotalFats = 0;
      let newTotalCarbs = 0;
      let newTotalSugar = 0;

      if (Array.isArray(range)) {
        // Day & Week view
        const start = new Date(range[0]);
        const end = new Date(range[range.length - 1]);
        start.setHours(0, 0, 0, 0);     //needed for daily
        end.setHours(23, 59, 59, 999);  //needed for daily

        visibleEvents = events.filter(
          (event) => event.start <= end && event.end >= start
        );
      } else if (range.start && range.end) {
        // For month view

        const start = new Date(range.start);
        const end = new Date(range.end);

        visibleEvents = events.filter((event) => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);

          const isEventInRange =
            (eventStart >= start && eventStart <= end) ||  // Event starts within the range
            (eventEnd >= start && eventEnd <= end) ||      // Event ends within the range
            (eventStart <= start && eventEnd >= end);      // Event spans across the entire range

          return isEventInRange;
        });
      }

      visibleEvents.forEach(e => {
        newTotalCalorie += e.calories
        newTotalProtein += e.protein
        newTotalFats += e.fats
        newTotalCarbs += e.carbs
        newTotalSugar += e.sugar
      })

      setTotals({
        calories: newTotalCalorie,
        protein: newTotalProtein,
        fats: newTotalFats,
        carbs: newTotalCarbs,
        sugars: newTotalSugar,
      });
    },
    [events]
  );

  useEffect(() => {
    if (events.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setHours(23, 59, 59, 999);
      handleOnRangeChange({ start: today, end: tomorrow });
    }
  }, [events, handleOnRangeChange]);


  //by default, BIG-CALENDAR only displayes "".title"
  const CustomEvent = ({ event }) => {
    return (
      <div className="cc_event_hflex">
        <strong>{event.title}</strong>
        <div>Fats: {event.fats}g</div>
        <div>Carbs: {event.carbs}g</div>
        <div>Protein: {event.protein}g</div>
        <div>Sugar: {event.sugar}g</div>
        <div>Calories: {event.calories}</div>
      </div>
    );
  };

  const handleSelectSlot = ({ start, end }) => {
    console.log(`!!!!! handleSelectSlot: Start = ${start}, End = ${end}`);
    handler(); // Call the function passed as a prop
  };

  const handleSelectEvent = (event) => {
    console.log(`+++++ handleSelectEvent`);
    console.log('+++++ event = ', event)
    onChange(event)
    // handler(event);
    //daylogform/:id
    nav(`/daylogform/${event.id}`)
  };

  const WeekdayHeader = ({ date }) => {
    //WeekView.topRow = {Sunday, Monday, etc...}
    return <div>{formatDate(date, 'EEEE')}</div>;
  };




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


      //eventPropGetter={eventStyleGetter} //css even styling
      eventPropGetter={(event) => ({
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
      })}

      // formats={formats} //non-css-format of time/date data
      formats={{
        weekdayFormat: (date) => formatDate(date, 'EEEE'),
        eventTimeRangeFormat: () => '',
      }}

      dayLayoutAlgorithm="no-overlap"
      scrollToTime={new Date(new Date().setHours(9, 30, 0, 0))}  //Will stop short of 5am if whole calendar is on page.
      components={{ //'component' overrides default
        week: { header: WeekdayHeader },
        day: { event: CustomEvent }
        // event: CustomEvent //applies to: day/week/monthly
      }}
      step={15}
      onRangeChange={handleOnRangeChange}
    />
  );
};

export default CustomCalendar;
