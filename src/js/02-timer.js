
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const fields = document.querySelectorAll('.field');
// const labels = document.querySelector('.timer');


const allButtonsNode = document.querySelectorAll('button');

const startButton = allButtonsNode[0];

const stopButton = allButtonsNode[1];

startButton.disabled = true;
const inputNode = document.querySelector('#datetime-picker');
let dateToSelect;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateToSelect = selectedDates[0];
    startButton.setAttribute('disabled', true);
    if (selectedDates[0] - options.defaultDate <= 0) {
      return alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};
startButton.addEventListener('click', e => {
  startButton.setAttribute('disabled', true);
  const intervalSet = setInterval(() => {
    let nowDate = new Date();
    const calculatedMs = dateToSelect - nowDate;
    const obj = convertMs(calculatedMs);
    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
    }

    const dateNode = document.querySelectorAll('.value');
    const daysNode = dateNode[0];
    daysNode.textContent = addLeadingZero(obj.days);
    const hoursNode = dateNode[1];
    hoursNode.textContent = addLeadingZero(obj.hours);
    const minutesNode = dateNode[2];
    minutesNode.textContent = addLeadingZero(obj.minutes);
    const secondsNode = dateNode[3];
    secondsNode.textContent = addLeadingZero(obj.seconds);

    if (calculatedMs <= 1000) clearInterval(intervalSet);
  }, 1000);
});

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

flatpickr(inputNode, options);