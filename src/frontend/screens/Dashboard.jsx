import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styling/dashboard.css';

const Dashboard = () => {
  const [isSickOrAbsent, setIsSickOrAbsent] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', toggleTimer, false);
    return () => {
      btn.removeEventListener('click', toggleTimer);
    };
  }, []);

  let timerRunning = false;
  let timerInterval;
  let hour = 0;
  let minute = 0;
  let second = 0;

  const toggleTimer = () => {
    if (!timerRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const stopTimer = () => {
    console.log('Timer stopped');
    clearInterval(timerInterval);
    timerRunning = false;

    if (minute % 15 !== 0) {
      let remainder = minute % 15;
      let increment = 15 - remainder;
      minute += increment;
      if (minute >= 60) {
        minute = 0;
        hour++;
      }
    }

    const padHour = padding(hour);
    const padMinute = padding(minute);
    const padSecond = padding(second);
    document.getElementById('time_hour').innerHTML = padHour;
    document.getElementById('time_minutes').innerHTML = padMinute;
    document.getElementById('time_seconds').innerHTML = padSecond;
  };

  const padding = (numPad) => {
    return numPad < 10 ? '0' + numPad : numPad.toString();
  };

  const startTimer = () => {
    timerRunning = true;
    console.log('Timer started');
    timerInterval = setInterval(() => {
      second++;
      if (second === 60) {
        second = 0;
        minute++;
      }
      if (minute === 60) {
        minute = 0;
        hour++;
      }
      const padHour = padding(hour);
      const padMinute = padding(minute);
      const padSecond = padding(second);
      document.getElementById('time_hour').innerHTML = padHour;
      document.getElementById('time_minutes').innerHTML = padMinute;
      document.getElementById('time_seconds').innerHTML = padSecond;
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    if (!token) window.location.reload();
    return 'You have been logged out.';
  };

  const handleSickOrAbsentChange = (event) => {
    setIsSickOrAbsent(event.target.checked);
  };

  return (
    <div className="container">
      <div className="left-half">
        <div>
          <h1>Dashboard</h1>
          <h2>Welcome, name here</h2>
        </div>
        <div id="calendar">
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
      <div className="right-half">
        <button className="logout" onClick={logout}>
          Log Out
        </button>
        <div className="container-right">
          <div className="sick">
            <div className="top-section">
              <h2>Sick or absent:</h2>
              <input
                id="input_sick"
                type="checkbox"
                onChange={handleSickOrAbsentChange}
                required
              />
            </div>
            <p id="subText">Sick or absent? Check this box.</p>
          </div>
          <div className="break_time">
            <div className="top-section">
              <h2>Time of break:</h2>
              <input
                id="input_break"
                type="number"
                required
                placeholder="1:00"
                disabled={isSickOrAbsent}
              />
            </div>
            <p id="subText">Duration of break time.</p>
          </div>
          <button
            className="timer"
            id="btn"
            type="button"
            disabled={isSickOrAbsent}
          >
            <div className="time-measure">
              <span id="time_hour">00</span>:<span id="time_minutes">00</span>:
              <span id="time_seconds">00</span>
            </div>
          </button>
          <p id="btn-subText">
            *Press the clock in button to start the timer and press clock out to
            stop the timer.*
          </p>
          <div className="handtekening">
            <div className="top-section">
              <h2>Signature:</h2>
              <input
                id="input_handtekening"
                type="checkbox"
                required
                disabled
              />
            </div>
            <p id="subText">
              If clock-in is accepted, the manager will check this box.
            </p>
          </div>
          <div className="save_button">
            <button
              className="btn_save"
              id="btn_save"
              disabled={isSickOrAbsent}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
