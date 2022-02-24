const pomodoroButton = document.querySelector(".pomodoro");
const shortBreakButton = document.querySelector(".short-break");
const longBreakButton = document.querySelector(".long-break");
const timer = document.querySelector(".timer");
const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const resetButton = document.querySelector(".reset-button");
const siteTitle = document.querySelector("title");
const alarm = document.querySelector(".alarm-sound");
let timeRemains = 1500;
let minutes = "";
let seconds = "";
let timeShow = "";
let timeGoing = false;
let selectedButton = "pomodoro";
let canPlay = false;

pomodoroButton.addEventListener("click", changeMode);
shortBreakButton.addEventListener("click", changeMode);
longBreakButton.addEventListener("click", changeMode);
function changeMode(){
    if(selectedButton == this.classList[0]) return;
    timeGoing = false;
    canPlay = false;
    selectedButton = this.classList[0];
    pomodoroButton.classList.remove("selected");
    shortBreakButton.classList.remove("selected");
    longBreakButton.classList.remove("selected");
    this.classList.add("selected");
    timeRemains = this.dataset.time;
    minutes = Math.floor(timeRemains/60);
    seconds = timeRemains%60;
    if (seconds == 0) seconds = "00";
    timeShow = minutes + ":" + seconds;
    timer.textContent = timeShow;
    siteTitle.textContent = `Pomodoro Timer`;
}

startButton.addEventListener("click", startTimer);
function startTimer(){
    timeGoing = true;
}

stopButton.addEventListener("click", stopTimer);
function stopTimer(){
    timeGoing = false;
}

resetButton.addEventListener("click", resetTimer);
function resetTimer(){
    timeGoing = false;
    canPlay = false;
    if(selectedButton == "pomodoro") timeRemains = 1500;
    if(selectedButton == "short-break") timeRemains = 300;
    if(selectedButton == "long-break") timeRemains = 900;
    minutes = Math.floor(timeRemains/60);
    seconds = timeRemains%60;
    if (seconds == 0) seconds = "00";
    timeShow = minutes + ":" + seconds;
    timer.textContent = timeShow;
    siteTitle.textContent = `Pomodoro Timer`;
}

setInterval(countDown, 1000);
function countDown(){
    if(!timeGoing) return;
    if(timeRemains == 0) return;
    timeRemains -=1;
    if(timeRemains == 0) canPlay = true;
    console.log("timer is running");
    minutes = Math.floor(timeRemains/60);
    seconds = timeRemains%60;
    if (seconds == 0) seconds = "00";
    timeShow = minutes + ":" + seconds;
    siteTitle.textContent = `${timeShow} - Pomodoro Timer`;
    timer.textContent = timeShow;
}

setInterval(playSound, 300);

function playSound(){
    if(!canPlay) return;
    alarm.currentTime = 0;
    alarm.play();
}


