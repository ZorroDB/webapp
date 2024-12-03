import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";

const Dashboard = () => {
  const [isSickOrAbsent, setIsSickOrAbsent] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    const padding = (numPad) => {
      return numPad < 10 ? "0" + numPad : numPad.toString();
    };

    const startTimer = () => {
      setTimerRunning(true);
      console.log("Timer started");
      setTimerInterval(
        setInterval(() => {
          setTime({ ...time, second: time.second + 1 });
          if (time.second === 60) {
            setTime({ ...time, second: 0, minute: time.minute + 1 });
          }
          if (time.minute === 60) {
            setTime({ ...time, minute: 0, hour: time.hour + 1 });
          }
          const padHour = padding(time.hour);
          const padMinute = padding(time.minute);
          const padSecond = padding(time.second);
          document.getElementById("time_hour").innerHTML = padHour;
          document.getElementById("time_minutes").innerHTML = padMinute;
          document.getElementById("time_seconds").innerHTML = padSecond;
        }, 1000)
      );
    };

    const stopTimer = () => {
      console.log("Timer stopped");
      clearInterval(timerInterval);
      setTimerRunning(false);

      if (time.minute % 15 !== 0) {
        let remainder = time.minute % 15;
        let increment = 15 - remainder;
        setTime({ ...time, minute: time.minute + increment });
        if (time.minute >= 60) {
          setTime({ ...time, minute: 0, hour: time.hour + 1 });
        }
      }

      const padHour = padding(time.hour);
      const padMinute = padding(time.minute);
      const padSecond = padding(time.second);
      document.getElementById("time_hour").innerHTML = padHour;
      document.getElementById("time_minutes").innerHTML = padMinute;
      document.getElementById("time_seconds").innerHTML = padSecond;
    };

    const toggleTimer = () => {
      if (!timerRunning) {
        startTimer();
      } else {
        stopTimer();
      }
    };

    const btn = document.getElementById("btn");
    btn.addEventListener("click", toggleTimer, false);
    return () => {
      btn.removeEventListener("click", toggleTimer);
    };
  }, [timerRunning, time, timerInterval]);

  const logout = () => {
    localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    if (!token) window.location.reload();
    return "You have been logged out.";
  };

  const handleSickOrAbsentChange = (event) => {
    setIsSickOrAbsent(event.target.checked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 to-primary/60 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Time Registration
            </h1>
            <h2 className="text-xl text-gray-600 mt-2">Welcome, name here</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full rounded-xl"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2 space-y-6">
          <button
            onClick={logout}
            className="ml-auto block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>

          <div className="space-y-6">
            {/* Sick/Absent Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Sick or absent
                </h2>
                <input
                  id="input_sick"
                  type="checkbox"
                  onChange={handleSickOrAbsentChange}
                  required
                  className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                Check this box if you are sick or absent
              </p>
            </div>

            {/* Break Time Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Break Duration
                </h2>
                <input
                  id="input_break"
                  type="number"
                  required
                  placeholder="Minutes"
                  disabled={isSickOrAbsent}
                  className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                Enter your break duration in minutes
              </p>
            </div>

            {/* Timer Section */}
            <button
              className={`w-full bg-white rounded-2xl shadow-md p-8 text-4xl font-mono ${
                isSickOrAbsent
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              id="btn"
              type="button"
              disabled={isSickOrAbsent}
            >
              <div className="text-center">
                <span id="time_hour">00</span>:<span id="time_minutes">00</span>
                :<span id="time_seconds">00</span>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Click to start/stop timer
              </p>
            </button>

            {/* Manager Approval Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Manager Approval
                </h2>
                <input
                  id="input_handtekening"
                  type="checkbox"
                  required
                  disabled
                  className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                Requires manager approval
              </p>
            </div>

            {/* Save Button */}
            <button
              className={`w-full py-4 rounded-xl text-white font-semibold text-lg ${
                isSickOrAbsent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 transition-colors"
              }`}
              id="btn_save"
              disabled={isSickOrAbsent}
            >
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
