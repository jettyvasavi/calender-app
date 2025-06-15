import React, { useState } from 'react';
import dayjs from 'dayjs';
import '../Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: ''
  });

  const startDay = currentDate.startOf('month').day();
  const daysInMonth = currentDate.daysInMonth();
  const today = dayjs().format('YYYY-MM-DD');

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', date: '', time: '', duration: '' });
  };

  const renderDays = () => {
    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = currentDate.date(d).format('YYYY-MM-DD');
      const dayEvents = events.filter(event => event.date === dateString);

      calendarDays.push(
        <div
          key={d}
          className={`day ${dateString === today ? 'today' : ''}`}
          tabIndex={0}
          aria-label={`Day ${d}${dateString === today ? ', today' : ''}`}
        >
          <div className="date-number">{d}</div>
          {dayEvents.map((event, idx) => (
            <div
              key={idx}
              className={`event ${
                dayEvents.filter(e => e.time === event.time).length > 1
                  ? 'conflict'
                  : ''
              }`}
              title={event.title}
            >
              <strong>{event.title}</strong>
              <br />
              <span>
                {event.time}
                {event.duration ? ` (${event.duration})` : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <main className="layout" aria-label="Calendar app layout">
      {/* Left Sidebar Form */}
      <form onSubmit={addEvent} className="event-form" aria-label="Add new event">
        <h2>Add Event</h2>
        <label htmlFor="event-title" className="sr-only">Event Title</label>
        <input
          type="text"
          id="event-title"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleInputChange}
          required
          autoComplete="off"
        />
        <label htmlFor="event-date" className="sr-only">Event Date</label>
        <input
          type="date"
          id="event-date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="event-time" className="sr-only">Event Time</label>
        <input
          type="time"
          id="event-time"
          name="time"
          value={newEvent.time}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="event-duration" className="sr-only">Event Duration</label>
        <input
          type="text"
          id="event-duration"
          name="duration"
          placeholder="Duration (optional)"
          value={newEvent.duration}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button type="submit" aria-label="Add event">Add Event</button>
      </form>

      
      <section className="calendar-container" aria-label="Calendar view">
        <header className="header">
          <button
            type="button"
            onClick={prevMonth}
            className="nav-btn"
            aria-label="Previous month"
            title="Previous month"
          >
           
            &#x276E;
          </button>
          <h2 aria-live="polite">{currentDate.format('MMMM YYYY')}</h2>
          <button
            type="button"
            onClick={nextMonth}
            className="nav-btn"
            aria-label="Next month"
            title="Next month"
          >
            &#x276F;
          </button>
        </header>

        <div className="weekdays">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
            <div key={day} className="weekday" aria-label={day}>{day}</div>
          ))}
        </div>

        <div className="days-grid">{renderDays()}</div>
      </section>
    </main>
  );
};

export default Calendar;



