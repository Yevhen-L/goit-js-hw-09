
import Notiflix from 'notiflix';
// import * as notiflix from "notiflix";
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements.delay.value);
  const delayStep = parseInt(this.elements.step.value);
  const amount = parseInt(this.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * delayStep;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});