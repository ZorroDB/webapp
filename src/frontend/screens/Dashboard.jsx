import React from 'react';
import './scripts/calendar';
import './styling/dashboard.css';

const Dashboard = () => {
  var timerRunning = false;
  var timerInterval;

  function init() {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', toggleTimer, false);
  }

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

  window.onload = init;
  return (
    <div className="dashboard">
      <div className="left-half">
        <div>
          <h1>Dashboard</h1>
        </div>
        <div id="calendar"></div>
      </div>
      <div className="right-half">
        {/* Log out button */}
        <button className="logout">Log Out</button>

        {/* Clock in timer */}
        <button className="timer" id="btn" type="button">
          <div className="time-management" id="start_text">
            <p>Click to start or stop</p>
            <div className="time-measure">
              <span id="time_hour">00</span>:<span id="time_minutes">00</span>:
              <span id="time_seconds">00</span>
            </div>
            <p>Clock in/ out</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
