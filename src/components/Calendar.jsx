import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import '../Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events.json')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const startDay = currentDate.startOf('month').day();
  const daysInMonth = currentDate.daysInMonth();
  const today = dayjs().format('YYYY-MM-DD');

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const renderDays = () => {
    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = currentDate.date(d).format('YYYY-MM-DD');
      const dayEvents = events.filter((event) => event.date === dateString);

      calendarDays.push(
        <div
          key={d}
          className={`day ${dateString === today ? 'today' : ''} ${
            dayEvents.length > 1 ? 'multiple-events' : ''
          }`}
        >
          <div className="date-number">{d}</div>
          {dayEvents.map((event, idx) => (
           <div 
             key={idx} 
             className={`event ${
             dayEvents.filter(e => e.time === event.time).length > 1 
             ? 'conflict' 
             : ''}`}>
             <strong>{event.title}</strong>
             <br />
             {event.time}
             {event.duration ? ` (${event.duration})` : ''}

           </div>
           ))}

        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <button onClick={prevMonth} className="nav-btn">❮</button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="nav-btn">❯</button>
      </div>
      <div className="weekdays">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div className="days-grid">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
