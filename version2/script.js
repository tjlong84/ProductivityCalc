function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

const startTime = document.getElementById('startTime');
const hoursInput = document.getElementById('durationHours');
const minutesInput = document.getElementById('durationMinutes');
const slider = document.getElementById('productivitySlider');
const prodMinus = document.getElementById('prodMinus');
const prodPlus = document.getElementById('prodPlus');
const prodValue = document.getElementById('productivityValue');
const endDisplay = document.getElementById('endTimeDisplay');
const progressRing = document.getElementById('progressRing');
const startStopBtn = document.getElementById('startStopBtn');
const darkToggle = document.getElementById('darkModeToggle');

let isRunning = false;
let timerInterval;
let endTimestamp;

function setStartNow() {
  const now = new Date();
  startTime.value = now.toISOString().slice(11,16);
}

function calcEndTime() {
  const [sh, sm] = startTime.value.split(':').map(Number);
  const startDec = sh + sm/60;
  const duration = Number(hoursInput.value) + Number(minutesInput.value)/60;
  const totalTime = duration / (Number(slider.value)/100);
  const endDec = startDec + totalTime;
  const end = new Date();
  end.setHours(0,0,0,0);
  end.setSeconds(endDec * 3600);
  endDisplay.textContent = 'Ends \u00b7 ' + formatAMPM(end);
  endTimestamp = new Date();
  endTimestamp.setHours(end.getHours(), end.getMinutes(), 0, 0);
  progressRing.style.setProperty('--value', 0);
  progressRing.dataset.label = '0%';
  localStorage.setItem('prodFactor', slider.value);
}

function updateSliderVal() {
  prodValue.textContent = slider.value + '%';
  calcEndTime();
}

function applyPreset(mins) {
  hoursInput.value = Math.floor(mins/60);
  minutesInput.value = mins % 60;
  calcEndTime();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startStopBtn.textContent = 'Stop';
  startStopBtn.classList.replace('btn-success','btn-danger');
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function stopTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  startStopBtn.textContent = 'Start';
  startStopBtn.classList.replace('btn-danger','btn-success');
  calcEndTime();
}

function updateTimer() {
  const now = new Date();
  const totalMs = (Number(hoursInput.value)*60 + Number(minutesInput.value)) / (Number(slider.value)/100) * 60000;
  const startDate = new Date(now.toDateString() + ' ' + startTime.value);
  const elapsed = now - startDate;
  const perc = Math.min(100, elapsed/totalMs*100);
  progressRing.style.setProperty('--value', perc);
  progressRing.dataset.label = Math.floor(perc) + '%';
  const remainingMs = endTimestamp - now;
  if (remainingMs <= 0) {
    stopTimer();
    progressRing.style.setProperty('--value', 100);
    progressRing.dataset.label = '100%';
  } else {
    const hrs = Math.floor(remainingMs/3600000);
    const mins = Math.ceil((remainingMs%3600000)/60000);
    endDisplay.textContent = 'Time left \u00b7 ' + hrs + 'h ' + mins + 'm';
  }
}

slider.addEventListener('input', updateSliderVal);
prodMinus.addEventListener('click', () => {
  slider.value = Math.max(50, Number(slider.value) - 5);
  slider.dispatchEvent(new Event('input'));
});
prodPlus.addEventListener('click', () => {
  slider.value = Math.min(150, Number(slider.value) + 5);
  slider.dispatchEvent(new Event('input'));
});

startTime.addEventListener('input', calcEndTime);
hoursInput.addEventListener('input', calcEndTime);
minutesInput.addEventListener('input', calcEndTime);

startStopBtn.addEventListener('click', () => {
  isRunning ? stopTimer() : startTimer();
});
progressRing.addEventListener('click', () => {
  isRunning ? stopTimer() : startTimer();
});

document.querySelectorAll('.preset').forEach(btn => {
  btn.addEventListener('click', () => applyPreset(Number(btn.dataset.minutes)));
});

if (darkToggle) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('darkMode');
  const enable = saved === null ? prefersDark : saved === 'true';
  document.body.classList.toggle('dark-mode', enable);
  darkToggle.checked = enable;
  darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkToggle.checked);
    localStorage.setItem('darkMode', darkToggle.checked);
  });
}

const savedProd = localStorage.getItem('prodFactor');
if (savedProd) {
  slider.value = savedProd;
  prodValue.textContent = savedProd + '%';
}
setStartNow();
calcEndTime();
