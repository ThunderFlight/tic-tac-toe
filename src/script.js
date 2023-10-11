import './style.css';

const arrWin = [
  ['0,0', '0,1', '0,2'],
  ['0,1', '1,1', '2,1'],
  ['1,0', '1,1', '1,2'],
  ['2,0', '2,1', '2,2'],
  ['0,0', '1,0', '2,0'],
  ['0,2', '1,2', '2,2'],
  ['0,0', '1,1', '2,2'],
  ['0,2', '1,1', '2,0'],
];
let countBlack = 0;
let countBlue = 0;
const obj = {};
const arrayWins = [];
let countFriendGame = 0;
let counter = 10;
const cordsUsers = {
  userBlue: [],
  userBlack: [],
};

const winsText = document.createElement('p');
const table = document.querySelector('.table-tic-tac-toe');
const buttonRestart = document.querySelector('.button-restart');
const buttonMenu = document.querySelector('.button-back');
const modalEnd = document.querySelector('.modal-end');
const winMessage = document.querySelector('.win-message');
const prePlayMenu = document.querySelector('.pre-play-menu');
const chooseBot = document.querySelector('.input-choose-bot');
const chooseFriend = document.querySelector('.input-choose-friend');

function randomTic() {
  return `${Math.floor(Math.random() * 3)},${Math.floor(Math.random() * 3)}`;
}

function isEmpty(cords) {
  const objCords = obj[cords].style.backgroundColor;
  return objCords !== 'black' && objCords !== 'blue';
}

function gameEnd(message) {
  arrayWins.push(message);
  localStorage.setItem('wins', JSON.stringify(arrayWins));
  winsText.innerHTML = '';
  winsText.innerHTML = JSON.parse(localStorage.getItem('wins')).map((item) => item);
  document.body.appendChild(winsText);
  winMessage.innerHTML = message;
  modalEnd.style.display = 'null';
  modalEnd.style.display = 'flex';
}

function checkWin() {
  for (let i = 0; i < arrWin.length; i += 1) {
    for (let j = 0; j < arrWin[i].length; j += 1) {
      if (cordsUsers.userBlack.includes(arrWin[i][j])) {
        countBlack += 1;
      }

      if (cordsUsers.userBlue.includes(arrWin[i][j])) {
        countBlue += 1;
      }

      if (countBlack >= 3) {
        return gameEnd('black win');
      }

      if (countBlue >= 3) {
        return gameEnd('blue win');
      }
    }

    countBlue = 0;
    countBlack = 0;
  }

  if (counter < 0) {
    return gameEnd('draw');
  }

  return '';
}

function friendGame(cord) {
  arrayWins.splice(0, arrayWins.length);
  localStorage.setItem('wins', []);
  countFriendGame += 1;
  counter -= 1;
  if (counter < 0) {
    return;
  }

  if (countFriendGame % 2 === 0) {
    obj[cord].style.backgroundColor = 'black';
    cordsUsers.userBlack.push(cord);
  } else {
    obj[cord].style.backgroundColor = 'blue';
    cordsUsers.userBlue.push(cord);
  }

  checkWin();
}

function botGame(cord) {
  arrayWins.splice(0, arrayWins.length);
  localStorage.setItem('wins', []);
  obj[cord].style.backgroundColor = 'black';
  cordsUsers.userBlack.push(cord);
  counter -= 1;
  checkWin();
  if (counter < 0) {
    return;
  }

  let randomCords = randomTic();
  while (!isEmpty(randomCords)) {
    randomCords = randomTic();
  }

  cordsUsers.userBlue.push(randomCords);
  // setTimeout(() => {
  counter -= 1;
  obj[randomCords].style.backgroundColor = 'blue';
  // }, 200);
  checkWin();
}

function createTableCross(func) {
  localStorage.setItem('wins', []);
  table.replaceChildren();
  for (let i = 0; i < 3; i += 1) {
    const tr = document.createElement('tr');
    tr.className = 'line';

    for (let j = 0; j < 3; j += 1) {
      const td = document.createElement('td');
      obj[`${i},${j}`] = td;
      tr.appendChild(td);
      td.className = 'cell';
      // eslint-disable-next-line no-loop-func
      td.addEventListener('click', () => {
        if (!isEmpty(`${i},${j}`)) {
          return;
        }

        func(`${i},${j}`);
      });
    }

    table.appendChild(tr);
  }
}

prePlayMenu.addEventListener('submit', (event) => {
  if (chooseBot.checked === true) {
    createTableCross(botGame);
  } else if (chooseFriend.checked === true) {
    createTableCross(friendGame);
  }

  event.preventDefault();
  prePlayMenu.style.display = 'none';
});

buttonRestart.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      obj[`${i},${j}`].style.backgroundColor = 'white';
    }
  }

  counter = 8;
  countBlack = 0;
  countBlue = 0;
  cordsUsers.userBlack = [];
  cordsUsers.userBlue = [];
  countFriendGame = 0;
  modalEnd.style.display = 'none';
});

buttonMenu.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      obj[`${i},${j}`].style.backgroundColor = 'white';
    }
  }

  counter = 8;
  countBlack = 0;
  countBlue = 0;
  cordsUsers.userBlack = [];
  cordsUsers.userBlue = [];
  countFriendGame = 0;
  modalEnd.style.display = 'none';
  prePlayMenu.style.display = 'flex';
  localStorage.setItem('wins', '');
  winsText.innerHTML = '';
});
