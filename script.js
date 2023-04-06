'use strict';

// Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const health0 = document.getElementById('health--0');
const health1 = document.getElementById('health--1');

const damage0 = document.getElementById('damage--0');
const damage1 = document.getElementById('damage--1');

const sword = document.querySelector('.sword');
const btnNew = document.querySelector('.btn--new');
const btnAttack = document.querySelector('.btn--attack');
const btnDefend = document.querySelector('.btn--defend');

let healths, currentDamage, activePlayer, playing;

const init = () => {
  healths = [1000, 1000];
  currentDamage = 0;
  activePlayer = 0;
  playing = true;

  health0.textContent = 1000;
  health1.textContent = 1000;
  damage0.textContent = 0;
  damage1.textContent = 0;

  sword.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--loser');
  player1.classList.remove('player--loser');
};

init();

const toggle = () => {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnAttack.addEventListener('click', function () {
  if (playing) {
    const dice = Math.ceil(Math.random() * 20);
    let img = '';

    if (dice <= 4) {
      img = 'Sword-1';
    } else if (dice > 4 && dice <= 8) {
      img = 'Sword-2';
    } else if (dice > 8 && dice <= 12) {
      img = 'Sword-3';
    } else if (dice > 12 && dice <= 16) {
      img = 'Sword-4';
    } else {
      img = 'Sword-5';
    }

    sword.classList.remove('hidden');
    sword.src = `${img}.png`;

    if (dice > 4) {
      currentDamage += dice;
      document.getElementById(`damage--${activePlayer}`).textContent =
        currentDamage;
    } else {
      document.getElementById(`damage--${activePlayer}`).textContent = 0;
      currentDamage = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      toggle();
    }
  }
});

btnDefend.addEventListener('click', function () {
  if (playing) {
    if (activePlayer === 0) {
      healths[1] -= currentDamage;
      currentDamage = 0;
      damage0.textContent = 0;
      document.getElementById('health--1').textContent = healths[1];

      if (healths[1] < 1) {
        playing = false;
        player0.classList.add('player--winner');
        player1.classList.add('player--loser');
      }
      activePlayer = activePlayer === 0 ? 1 : 0;
      toggle();
    } else {
      healths[0] -= currentDamage;
      currentDamage = 0;
      damage1.textContent = 0;
      document.getElementById('health--0').textContent = healths[0];

      if (healths[0] < 1) {
        playing = false;
        player1.classList.add('player--winner');
        player0.classList.add('player--loser');
      }
      activePlayer = activePlayer === 0 ? 1 : 0;
      toggle();
    }
  }
});

btnNew.addEventListener('click', init);
