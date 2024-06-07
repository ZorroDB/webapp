import React, { useEffect } from 'react';
import './scripts/calendar';
import './styling/dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', toggleTimer, false);
    return () => {
      btn.removeEventListener('click', toggleTimer);
    };
  }, []);

  var timerRunning = false;
  var timerInterval;

  function toggleTimer() {
    if (!timerRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  }

  function stopTimer() {
    console.log('Timer stopped');
    clearInterval(timerInterval);
    timerRunning = false;
  }

  function padding(numPad) {
    return numPad < 10 ? '0' + numPad : numPad.toString();
  }

  let hour = 0;
  let minute = 0;
  let second = 0;

  function startTimer() {
    timerRunning = true;
    // btn.style.backgroundColor = 'red';
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

      // Update padded values
      let padHour = padding(hour);
      let padMinute = padding(minute);
      let padSecond = padding(second);

      // Update the HTML elements with the new time
      document.getElementById('time_hour').innerHTML = padHour;
      document.getElementById('time_minutes').innerHTML = padMinute;
      document.getElementById('time_seconds').innerHTML = padSecond;
    }, 1000);
  }

  const logout = () => {
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    if (!token) window.location.reload();
    return 'You have been logged out.';
  };

  return (
    <div className="dashboard">
      <div className="left-half">
        <div>
          <h1>Dashboard</h1>
          <h2>Welcome, name here</h2>
        </div>
        <div id="calendar"></div>
      </div>
      <div className="right-half">
        {/* Log out button */}
        <button className="logout" onClick={logout}>
          Log Out
        </button>
        <div class="sick">
          <div class="top-section">
            <h2>Sick or absent?</h2>
            <input id="input_sick" type="checkbox" required></input>
          </div>
          <p id="subText">Sick or absent? Check this box.</p>
        </div>
        {/* Clock in timer */}
        <button className="timer" id="btn" type="button">
          <div className="time-measure">
            <span id="time_hour">00</span>:<span id="time_minutes">00</span>:
            <span id="time_seconds">00</span>
          </div>
        </button>
        <p id="btn-subText">
          *Press the clock in button to start the timer and press clock out to
          stop the timer.*
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
