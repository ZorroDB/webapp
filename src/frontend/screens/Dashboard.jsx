import React from 'react';
import './styling/dashboard.css';

const Dashboard = () => {
  function padding(numPad) {
    return numPad < 10 ? '0' + numPad : numPad.toString();
  }

  let hour = 0;
  let minute = 0;
  let second = 0;

  function increment() {
    setInterval(() => {
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

  return (
    <div className="dashboard">
      <div>
        <h1>Dashboard</h1>
      </div>
      <button className="logout">Log Out</button>
      <button className="timer" type="button" onClick={increment()}>
        <div className="time-management">
          <p>Click to start</p>
          <div className="time-measure">
            <span id="time_hour"></span>:<span id="time_minutes"></span>:
            <span id="time_seconds"></span>
          </div>
          <p>Clock in/ out</p>
        </div>
      </button>
    </div>
  );
};

export default Dashboard;
