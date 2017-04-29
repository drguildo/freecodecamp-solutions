// jshint esversion: 6

/*
NOTES
-----
Use `requestAnimationFrame` for timer?
Probably `setInterval` is better.
*/

let timeLeft = 0;
let running = false;

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function id(id) {
  return document.getElementById(id);
}

function getBreakLength() {
  return Number(id("break-length").innerText);
}

function setBreakLength(minutes) {
  if (minutes < 0) {
    return;
  }
  id("break-length").innerText = minutes;
}

function getSessionLength() {
  return Number(id("session-length").innerText);
}

function setSessionLength(minutes) {
  if (minutes < 0) {
    return;
  }
  id("session-length").innerText = minutes;
}

function decrementBreakLengthClicked() {
  if (running) {
    return;
  }
  setBreakLength(getBreakLength() - 1);
}

function incrementBreakLengthClicked() {
  if (running) {
    return;
  }
  setBreakLength(getBreakLength() + 1);
}

function decrementSessionLengthClicked() {
  if (running) {
    return;
  }
  setSessionLength(getSessionLength() - 1);
}

function incrementSessionLengthClicked() {
  if (running) {
    return;
  }
  setSessionLength(getSessionLength() + 1);
}

function startTimer() {}

function pauseTimer() {}

function updateMeter(percentage) {
  if (percentage < 0) {
    return;
  }

  let meterFill = id("progress-fill");
  meterFill.style.top = percentage + "%";
}

function startClicked() {
  console.log("start clicked");
}

function setupEventListeners() {
  console.log("configuring event listeners");

  id("decrement-break-length").addEventListener("click", decrementBreakLengthClicked);
  id("increment-break-length").addEventListener("click", incrementBreakLengthClicked);

  id("decrement-session-length").addEventListener("click", decrementSessionLengthClicked);
  id("increment-session-length").addEventListener("click", incrementSessionLengthClicked);

  id("progress-meter").addEventListener("click", startClicked);
}

ready(setupEventListeners);