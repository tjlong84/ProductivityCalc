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
const ringCircle = progressRing.querySelector('.ring');
const percentDisplay = document.getElementById('percentDisplay');
const darkToggle = document.getElementById('darkModeToggle');

const timeInfo = document.getElementById('timeInfo');
let timerInterval;
let endTimestamp;
const RADIUS = 90;
const CIRC = 2 * Math.PI * RADIUS;
ringCircle.style.strokeDasharray = CIRC;

const colorThemes = {
  blue: {light: '#2563EB', dark: '#60A5FA'},
  pink: {light: '#EC4899', dark: '#F9A8D4'},
  green: {light: '#10B981', dark: '#6EE7B7'},
  purple: {light: '#8B5CF6', dark: '#C4B5FD'}
};

function setTheme(name) {
  const t = colorThemes[name];
  if (!t) return;
  document.documentElement.style.setProperty('--ring-color', t.light);
  document.documentElement.style.setProperty('--ring-color-dark', t.dark);
  localStorage.setItem('theme', name);
}

function setProgress(p) {
  const offset = CIRC * (1 - p / 100);
  ringCircle.style.strokeDashoffset = offset;
  percentDisplay.textContent = Math.floor(p) + '%';
}

function setStartDefault() {
  startTime.value = '07:00';
  hoursInput.value = 7;
  minutesInput.value = 0;
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
  setProgress(0);
  localStorage.setItem('prodFactor', slider.value);
}

function updateSliderVal() {
  prodValue.textContent = slider.value + '%';
  calcEndTime();
}


function modifyDuration(mins) {
  let total = Number(hoursInput.value) * 60 + Number(minutesInput.value) + mins;
  const max = 23 * 60 + 55;
  total = Math.max(0, Math.min(max, total));
  hoursInput.value = Math.floor(total / 60);
  minutesInput.value = total % 60;
  calcEndTime();
}


function updateTimer() {
  const now = new Date();
  const totalMs = (Number(hoursInput.value) * 60 + Number(minutesInput.value)) /
    (Number(slider.value) / 100) * 60000;
  const startDate = new Date(now.toDateString() + ' ' + startTime.value);
  let elapsed = now - startDate;
  let perc = (elapsed / totalMs) * 100;
  perc = Math.min(100, Math.max(0, perc));

  setProgress(perc);

  let remainingMs = endTimestamp - now;
  if (remainingMs < 0) remainingMs = 0;
  const hrs = Math.floor(remainingMs / 3600000);
  const mins = Math.ceil((remainingMs % 3600000) / 60000);

  const completedMs = Math.min(totalMs, Math.max(0, elapsed));
  const doneHrs = Math.floor(completedMs / 3600000);
  const doneMins = Math.floor((completedMs % 3600000) / 60000);

  timeInfo.textContent =
    doneHrs + 'h ' + doneMins + 'm done · ' +
    hrs + 'h ' + mins + 'm left';
}

slider.addEventListener('input', updateSliderVal);
prodMinus.addEventListener('click', () => {
  slider.value = Math.max(50, Number(slider.value) - 5);
  slider.dispatchEvent(new Event('input'));
});
prodPlus.addEventListener('click', () => {
  slider.value = Math.min(100, Number(slider.value) + 5);
  slider.dispatchEvent(new Event('input'));
});

startTime.addEventListener('input', calcEndTime);
hoursInput.addEventListener('input', calcEndTime);
minutesInput.addEventListener('input', calcEndTime);


document.querySelectorAll('.adjust-time').forEach(btn => {
  btn.addEventListener('click', () => modifyDuration(Number(btn.dataset.minutes)));
});

document.querySelectorAll('#colorOptions .color-btn').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.color));
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
const savedTheme = localStorage.getItem('theme');
if (savedTheme && colorThemes[savedTheme]) {
  setTheme(savedTheme);
} else {
  setTheme('blue');
}
setStartDefault();
calcEndTime();
updateTimer();
timerInterval = setInterval(updateTimer, 1000);
