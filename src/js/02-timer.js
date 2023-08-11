import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let intervalId = null;

function startTimer(targetDate) {
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeRemaining = targetDate - currentDate;
    
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      renderTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.success('Timer has ended');
      startBtn.disabled = false;
    } else {
      const time = convertMs(timeRemaining);
      renderTime(time);
    }
  }, 1000);
}

function renderTime(time) {
  daysEl.textContent = addLeadingZero(time.days);
  hoursEl.textContent = addLeadingZero(time.hours);
  minutesEl.textContent = addLeadingZero(time.minutes);
  secondsEl.textContent = addLeadingZero(time.seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('You can start the timer now');
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
  const selectedDate = new Date(datePicker.value);
  startBtn.disabled = true;
  startTimer(selectedDate);
});
