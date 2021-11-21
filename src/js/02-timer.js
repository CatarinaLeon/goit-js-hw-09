
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataDays= document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const input = document.querySelector('[datetime-picker]');
const startButton = document.querySelector('[data-start]');


startButton.setAttribute('disabled', true);

const options = {
  time_24hr: true,
  enableTime: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure(`Please choose a date in the future`);
    }
    startButton.removeAttribute(`disabled`)
    startButton.addEventListener(`click`, (() => {
      const timer = selectedDates[0].getTime()
      const startTimer = setInterval(() => {
        const deltaTime = timer - new Date()
        const time = convertMs(deltaTime)
        if (timer - new Date() > 0) {
          updateTime(time)
          startTimerButton.setAttribute(`disabled`, true)
          input.setAttribute(`disabled`, true)
        } else {
          clearInterval(startTimer)
          return Notiflix.Notify.success('Time is up!');
        }
      }, 1000)
    }))
  }
};


// startButton.addEventListener('click', e => {
//   startButton.setAttribute('disabled', true);
//   const intervalSet = setInterval(() => {
//     let nowDate = new Date();
//     const calculatedMs = dateToSelect - nowDate;
//     const obj = convertMs(calculatedMs);
//     function addLeadingZero(value) {
//       return String(value).padStart(2, '0');
//     }

//     const dateNode = document.querySelectorAll('.value');
//     const daysNode = dateNode[0];
//     daysNode.textContent = addLeadingZero(obj.days);
//     const hoursNode = dateNode[1];
//     hoursNode.textContent = addLeadingZero(obj.hours);
//     const minutesNode = dateNode[2];
//     minutesNode.textContent = addLeadingZero(obj.minutes);
//     const secondsNode = dateNode[3];
//     secondsNode.textContent = addLeadingZero(obj.seconds);

//     if (calculatedMs <= 1000) clearInterval(intervalSet);
//   }, 1000);
// });

function updateTime({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
};

flatpickr('input', options);