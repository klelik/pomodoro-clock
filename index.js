const TWENTYFIVE_MINUTES = 25 * 60;
const FIVE_MINUTES = 5 * 60;
let isSessionMode = true;
let breakSessionLength = 5 * 60;
let sessionLength = 25 * 60;
let sessionTimer;
let breakTimer;
const breakMinusElement = document.getElementById("break-minus-element");
const breakSessionElement = document.getElementById("break-session-element");
const breakPlusElement = document.getElementById("break-plus-element");
const sessionMinusElement = document.getElementById("session-minus-element");
const sessionElement = document.getElementById("session-element");
const sessionPlusElement = document.getElementById("session-plus-element");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const title = document.getElementById("title");

reset();

function playSound() {
  var audio = new Audio('https://freesound.org/data/previews/316/316847_4939433-lq.mp3');
  audio.play();
}

function updateUITimer(length) {
    let floorMin = Math.floor(length / 60);
    let floorSec = (length % 60);

  if (floorMin.toString().length === 1) {    /*if(minutes displayed is 1:..) => make it 01: */
    timerMinutes.textContent = "0" + floorMin;
  } else {
    timerMinutes.textContent = floorMin;
  }
  if (floorSec.toString().length === 1) {    /*if(secs displayed is ..:1) => make it ..:01 */
    timerSeconds.textContent = "0" + floorSec;
  } else {
    timerSeconds.textContent = floorSec;
  }
}

function reset() {
  isSessionMode = true;
  breakSessionLength = FIVE_MINUTES;
  sessionLength = TWENTYFIVE_MINUTES;
  breakSessionElement.textContent = FIVE_MINUTES / 60;      /*#sessionElement = 25 */
  sessionElement.textContent = TWENTYFIVE_MINUTES / 60;     /* #breakSessionElement = 5 */
  clearInterval(sessionTimer);                              /*stop timer after reseting values */
  timerMinutes.textContent = "25";                           /*#timer min = 25 */
  timerSeconds.textContent = "00";
}

function startBreak() {
  clearInterval(sessionTimer);
  isSessionMode = false;
  playSound();
  sleep(1000);


  title.textContent = "Break" ;

  breakTimer = setInterval(() => {
    breakSessionLength -= 1;
    updateUITimer(breakSessionLength);

    if (breakSessionLength === 0) {
      sessionLength = parseInt(sessionElement.textContent, 10) * 60;
      updateUITimer(sessionLength);
      startSession();
    }
  }, 1000);
}

function startSession() {
  clearInterval(breakTimer);
  isSessionMode = true;
  title.textContent = "Session";

  sessionTimer = setInterval(() => {    /* Displays new timerMin and timerSec every 1000 sec */
    sessionLength -= 1;
    updateUITimer(sessionLength);

    if (sessionLength === 0) {
      breakSessionLength = parseInt(breakSessionElement.textContent, 10) * 60;
      updateUITimer(breakSessionLength);
      startBreak();
    }
  }, 1000);
}

playButton.addEventListener("click", () => {
  if (isSessionMode) {
    startSession();
  } else {
    startBreak();
  }
});

pauseButton.addEventListener("click", () => {
  if (isSessionMode) {
    clearInterval(sessionTimer);            /*stop timer*/
  }
});

resetButton.addEventListener("click", () => {
  reset();
});

breakMinusElement.addEventListener("click", () => {
  if (breakSessionLength - 60 === 0) {
    return;
  }
  breakSessionLength -= 60;
  breakSessionElement.textContent = breakSessionLength / 60;
});

breakPlusElement.addEventListener("click", () => {
  breakSessionLength += 60;
  breakSessionElement.textContent = breakSessionLength / 60;
});

sessionMinusElement.addEventListener("click", () => {
  if (sessionLength - 60 === 0) {
    return;
  }
  sessionLength -= 60;
  sessionElement.textContent = Math.floor(sessionLength / 60);
  if (isSessionMode) {
    timerMinutes.textContent = Math.floor(sessionLength / 60);
  }
});

sessionPlusElement.addEventListener("click", () =>{
    sessionLength +=60;
    sessionElement.textContent = Math.floor(sessionLength / 60);
    if (isSessionMode) {
      timerMinutes.textContent = Math.floor(sessionLength / 60);
    }
});

