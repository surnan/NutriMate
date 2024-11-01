// frontend/src/componenets/CustomCalendar.jsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

import { useEffect } from "react";
import { getDailyLogsAllThunk } from "../../redux/daylogs";
import { useDispatch, useSelector } from "react-redux";


// function MyCalendar() {  //ORIGINAL
const MyCalendar = ({ value, onChange }) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state.session.user);
  const dayLogsArr = useSelector(state => state.daylogs.allDaylogs);

  useEffect(() => {
    dispatch(getDailyLogsAllThunk())
  }, [dispatch])

  // useEffect(() => {
  //   console.log('==> CustomCalendar +++++ => dayLogsArr updated ==> ', dayLogsArr);
  // }, [dayLogsArr]);


  // const highlightDates = dayLogsArr.reduce((acc, log) => {
  //   const date = new Date(log.timestamp);
  //   const dateString = date.toDateString();
  //   // Add only unique dates to the accumulator
  //   if (!acc.some(d => d.toDateString() === dateString)) {
  //     acc.push(date);
  //   }
  //   return acc;
  // }, []);

  const highlightDates = dayLogsArr.reduce((acc, log) => {
    if (log.userId === sessionUser?.id) { // Check if the log belongs to the current user
      const date = new Date(log.timestamp);
      const dateString = date.toDateString();
      // Add only unique dates to the accumulator
      if (!acc.some(d => d.toDateString() === dateString)) {
        acc.push(date);
      }
    }
    return acc;
  }, []);

  

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (highlightDates.some((highlightDate) => highlightDate.toDateString() === date.toDateString())) {
        return 'highlighted-date';
      }
    }
    return null;
  };

  return (
    <Calendar
      onChange={onChange}
      value={value}
      tileClassName={tileClassName}
      locale="en-US"
    />
  );
}

export default MyCalendar;
