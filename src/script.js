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
  const objCords = obj[cords].style.backgroundImage;
  return objCords !== 'url("./assets/Redstarbird.png")' && objCords !== 'url("./assets/r2d2.png")' && objCords !== 'url("./assets/empire-icon-21.png")';
}

function gameEnd(message) {
  arrayWins.push(message);
  localStorage.setItem('wins', JSON.stringify(arrayWins));
  winsText.innerHTML = '';
  winsText.innerHTML = JSON.parse(localStorage.getItem('wins')).map((item) => item);
  document.querySelector('.results').appendChild(winsText);
  winMessage.innerHTML = message;
  modalEnd.style.display = 'null';
  modalEnd.style.display = 'flex';
}

function checkWin(empire, rebals, r2d2 = 'none') {
  for (let i = 0; i < arrWin.length; i += 1) {
    for (let j = 0; j < arrWin[i].length; j += 1) {
      if (cordsUsers.userBlack.includes(arrWin[i][j])) {
        countBlack += 1;
      }

      if (cordsUsers.userBlue.includes(arrWin[i][j])) {
        countBlue += 1;
      }

      if (countBlack >= 3) {
        return gameEnd(rebals);
      }

      if (countBlue >= 3) {
        return r2d2 === 'none' ? gameEnd(empire) : gameEnd(r2d2);
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
    obj[cord].style.backgroundImage = 'url("./assets/Redstarbird.png")';
    obj[cord].style.backgroundSize = 'cover';
    cordsUsers.userBlack.push(cord);
  } else {
    obj[cord].style.backgroundImage = 'url("./assets/empire-icon-21.png")';
    obj[cord].style.backgroundSize = 'cover';
    cordsUsers.userBlue.push(cord);
  }

  checkWin('empire', 'rebals');
}

function botGame(cord) {
  arrayWins.splice(0, arrayWins.length);
  localStorage.setItem('wins', []);

  if (isEmpty(cord)) {
    obj[cord].style.backgroundImage = "url('./assets/Redstarbird.png')";
    obj[cord].style.backgroundSize = 'cover';
    cordsUsers.userBlack.push(cord);
    counter -= 1;
    checkWin('empire win', 'rebals win', 'r2d2 win');
  }

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
  // obj[randomCords].style.backgroundColor = 'blue';
  obj[randomCords].style.backgroundImage = "url('./assets/r2d2.png')";
  obj[randomCords].style.backgroundSize = 'cover';
  // }, 200);
  checkWin('empire win', 'rebals win', 'r2d2 win');
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
    document.querySelector('body').style.backgroundImage = 'url("./assets/star-wars-landscape-wallpapers-121180-589576-3287411.jpg")';
    createTableCross(botGame);
  } else if (chooseFriend.checked === true) {
    document.querySelector('body').style.backgroundImage = "url('./assets/1313954.jpeg')";
    createTableCross(friendGame);
  }

  event.preventDefault();
  prePlayMenu.style.display = 'none';
});

buttonRestart.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      obj[`${i},${j}`].style.backgroundImage = '';
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
      obj[`${i},${j}`].style.backgroundImage = '';
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
