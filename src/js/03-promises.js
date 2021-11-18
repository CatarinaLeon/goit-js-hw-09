import Notiflix from "../../node_modules/notiflix";

const query = (selector) => document.querySelector(selector);
const form = query(".form")


function createPromise(position, delay) {
  setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
},delay)
}


function handleSubmit(event) {
  event.preventDefault();
  const {elements: { delay, step, amount}} = event.currentTarget;
 for(let i =0; i< amount.value; i++){
 let repet = i+1
 let del = Number(delay.value)+Number(i*step.value);
  createPromise(repet,del)
}

  event.currentTarget.reset();
}

form.addEventListener("submit", handleSubmit);