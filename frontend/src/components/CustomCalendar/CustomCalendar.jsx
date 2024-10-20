import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

// function MyCalendar() {  //ORIGINAL
function MyCalendar({value, onChange}) {
  const [date, setDate] = useState(new Date()); //today

  const highlightDates = [
    new Date(2024, 9, 24), // October 24, 2024 - random
    new Date(2024, 9, 31), // October 31, 2024 - random
  ];

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
      // onChange={setDate}
      onChange={onChange}
      // value={date}
      value={value}
      tileClassName={tileClassName}
      locale="en-US"
    />
  );
}

export default MyCalendar;
