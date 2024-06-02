import React from 'react';
import './styling/dashboard.css';

const Dashboard = () => {
  let start = document.className('timer');
  let stop = document.className('timer');

  isTimer = false;
  let timerId;

  start.addEventListener('click', function () {
    if (isTimer == false) {
      let timerId = setInterval(function () {
        console.log('!');
      }, 1000);
    }
  });
  stop.addEventListener('click', function () {
    if (isTimer == true) {
      clearInterval(timerId);
      console.log('Timer stopped!');
    }
  });
  return (
    <div className="dashboard">
      <div>
        <h1>Dashboard</h1>
      </div>
      <button className="logout">Log Out</button>
      <div className="timer" onClick={'StartTimer()'}>
        <div className="time-management">
          <p>Click to start</p>
          <span className="time-measure">0:00</span>
          <p>Clock in/ out</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
