// jshint esversion: 6

/*
NOTES
-----
Use `requestAnimationFrame` for timer?
Probably `setInterval` is better.

TODO
----
Update progress based on time delta rather than decrementing a fixed
amount.
*/

const ModeEnum = {
  SESSION: 0,
  BREAK: 1
};
const StateEnum = {
  RUNNING: 0,
  PAUSED: 1,
  STOPPED: 2
};

let mode = ModeEnum.SESSION;
let state = StateEnum.STOPPED;
let timeTotal, timeLeft, intervalID;

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
  if (minutes < 1) {
    return;
  }
  id("break-length").innerText = minutes;
}

function getSessionLength() {
  return Number(id("session-length").innerText);
}

function setSessionLength(minutes) {
  if (minutes < 1) {
    return;
  }
  id("session-length").innerText = minutes;
}

function decrementBreakLengthClicked() {
  if (state === StateEnum.RUNNING) {
    return;
  }
  if (mode === ModeEnum.BREAK && state === StateEnum.PAUSED) {
    stop();
  }
  setBreakLength(getBreakLength() - 1);
}

function incrementBreakLengthClicked() {
  if (state === StateEnum.RUNNING) {
    return;
  }
  if (mode === ModeEnum.BREAK && state === StateEnum.PAUSED) {
    stop();
  }
  setBreakLength(getBreakLength() + 1);
}

function decrementSessionLengthClicked() {
  if (state === StateEnum.RUNNING) {
    return;
  }
  if (mode === ModeEnum.SESSION && state === StateEnum.PAUSED) {
    stop();
  }
  setSessionLength(getSessionLength() - 1);
}

function incrementSessionLengthClicked() {
  if (state === StateEnum.RUNNING) {
    return;
  }
  if (mode === ModeEnum.SESSION && state === StateEnum.PAUSED) {
    stop();
  }
  setSessionLength(getSessionLength() + 1);
}

function updateMeter() {
  console.log("time left: " + timeLeft + "/" + timeTotal);

  let percentLeft = Math.floor((timeLeft / timeTotal) * 100);
  let meterFill = id("progress-fill");
  // `top` is the distance between the meter gauge and the top of the
  // enclosing box and so 0% is a full meter and 100% is an empty one.
  meterFill.style.top = (100 - percentLeft) + "%";

  let meterText = id("progress-time");
  meterText.innerText = timeLeft;
}

function start(newMode) {
  state = StateEnum.RUNNING;
  mode = newMode;

  let seconds;
  if (mode === ModeEnum.SESSION) {
    seconds = getSessionLength();
  } else {
    seconds = getBreakLength();
  }
  seconds *= 60;
  timeLeft = timeTotal = seconds;

  if (intervalID) {
    clearInterval(intervalID);
  }

  intervalID = setInterval(timerCallback, 1000);
}

function pause() {
  console.log("paused");
  state = StateEnum.PAUSED;
  clearInterval(intervalID);
}

function unpause() {
  console.log("unpaused");
  state = StateEnum.RUNNING;
  intervalID = setInterval(timerCallback, 1000);
}

function stop() {
  state = StateEnum.STOPPED;
  clearInterval(intervalID);
}

function timerCallback() {
  if (timeLeft <= 0) {
    if (mode === ModeEnum.SESSION) {
      start(ModeEnum.BREAK);
    } else {
      start(ModeEnum.SESSION);
    }
  } else {
    timeLeft--;
  }
  updateMeter();
}

function timerClicked() {
  console.log("timer clicked");

  switch (state) {
    case StateEnum.STOPPED:
      {
        start(ModeEnum.SESSION);
        break;
      }
    case StateEnum.RUNNING:
      {
        pause();
        break;
      }
    case StateEnum.PAUSED:
      {
        unpause();
        break;
      }
  }
}

function setupEventListeners() {
  console.log("configuring event listeners");

  id("decrement-break-length").addEventListener("click", decrementBreakLengthClicked);
  id("increment-break-length").addEventListener("click", incrementBreakLengthClicked);

  id("decrement-session-length").addEventListener("click", decrementSessionLengthClicked);
  id("increment-session-length").addEventListener("click", incrementSessionLengthClicked);

  id("progress-meter").addEventListener("click", timerClicked);
}

ready(setupEventListeners);