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

const colorArray = ["#eeeeaf", "#7accc8", "#f82927", "#68af2c", '#cdb4a0', "#f1a9c7", "#b8b8ff", "#20b2aa"];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

const CustomCalendar = ({ width = '100%', height = '1200px', handler }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

  const [events, setEvents] = useState([]);
  const [totalCalories, setTotalCalorie] = useState(0)
  const [totalProtein, setTotalProtein] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalFats, setTotalFats] = useState(0)
  const [totalSugars, setTotalSugars] = useState(0)

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
    console.log("==== DD ... events ... ", events)
    console.log("==== DD ... dayLogsArr ... ", dayLogsArr)
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
    //WeekView.topRow = {Sunday, Monday, etc...}
    return <div>{formatDate(date, 'EEEE')}</div>;
  };


  const formats = {
    weekdayFormat: (date) => formatDate(date, 'EEEE'),
    eventTimeRangeFormat: () => '',
  };

  const handleOnRangeChange = useCallback(
    (range) => {
      // console.log("..handleOnRangeChange..");

      console.log("...EE...119...Range:", range);
      console.log("...EE...120...Events: ", events)

      let visibleEvents = [];

      let newTotalCalorie = 0;
      let newTotalProtein = 0;
      let newTotalFats = 0;
      let newTotalCarbs = 0;
      let newTotalSugar = 0;

      if (Array.isArray(range)) { // Day & Week view
        const start = new Date(range[0]);
        const end = new Date(range[range.length - 1]);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        console.log("...A...")
        visibleEvents = events.filter(
          (event) => event.start <= end && event.end >= start
        );
      } else if (range.start && range.end) {          // For month view
        console.log("..B..")

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
      console.log("visibleEvents.title:", visibleEvents.map((event) => event.title));
      console.log("====")
      console.log("visibleEvents:", visibleEvents);


      /*
      //bug due to asynch timing.  Values not guaranteed to be zero prior to adding
      setTotalCalorie(0)
      setTotalProtein(0)
      console.log("b4...totalcalorie = ", totalCalorie)
      console.log("b4...totalprotein = ", totalProtein)
      */

      console.log("++ START +++++++++++++++++++++")
      visibleEvents.forEach(e => {
        console.log(">>> INSIDE LOOP >>>")
        console.log("e = ", e)
        newTotalCalorie += e.calories
        newTotalProtein += e.protein
        newTotalFats += e.fats
        newTotalCarbs += e.carbs
        newTotalSugar += e.sugar
      })
      console.log("++ FINISH +++++++++++++++++++++")

      console.log("newTotalCalorie = ", newTotalCalorie)
      console.log("newTotalProtein = ", newTotalProtein)
      console.log("newTotalFats = ", newTotalFats)
      console.log("newTotalCarbs = ", newTotalCarbs)
      console.log("newTotalSugar = ", newTotalSugar)

      setTotalCalorie(newTotalCalorie)
      setTotalProtein(newTotalProtein)
      setTotalFats(newTotalFats)
      setTotalCarbs(newTotalCarbs)
      setTotalSugars(newTotalSugar)
    },
    [events]
  );

  useEffect(()=>{
    console.log('====> totalCalories ==> ', totalCalories)
    console.log('====> totalProtein ==> ', totalProtein)
    console.log('====> totalCarbs ==> ', totalCarbs)
    console.log('====> totalFats ==> ', totalFats)
    console.log('====> totalSugars ==> ', totalSugars)
  }, [totalSugars])

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
        day: { event: CustomEvent }
        // event: CustomEvent //applies to: day/week/monthly
      }}
      step={15}
      onRangeChange={handleOnRangeChange}
    />
  );
};

export default CustomCalendar;
