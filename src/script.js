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
const arrayWinsBot = [];
const arrayWinsFriend = [];
let countFriendGame = 0;
let counter = 10;
let sideChoose;
const cordsUsers = {
  userBlue: [],
  userBlack: [],
};

const table = document.querySelector('.table-tic-tac-toe');
const buttonRestart = document.querySelector('.button-restart');
const buttonMenu = document.querySelector('.button-back');
const modalEnd = document.querySelector('#modal-end-game');
const winMessage = document.querySelector('.win-message');
const prePlayMenu = document.querySelector('.pre-play-menu');
const chooseBot = document.querySelector('.input-choose-bot');
const chooseFriend = document.querySelector('.input-choose-friend');
const playButton = document.querySelector('.play-button');
const body = document.querySelector('body');
const chooseSide = document.querySelector('#side-modal-choose');
const buttonDarkSide = document.querySelector('.choose-dark-side');
const buttonLightSide = document.querySelector('.choose-light-side');

function randomTic() {
  return `${Math.floor(Math.random() * 3)},${Math.floor(Math.random() * 3)}`;
}

function isEmpty(cords) {
  const objCordsRebals = obj[cords].classList.contains('rebals');
  const objCordsR2D2 = obj[cords].classList.contains('r2d2');
  const objCordsEmpire = obj[cords].classList.contains('empire');
  return objCordsRebals || objCordsR2D2 || objCordsEmpire;
}

function gameEnd(message, arrayWins, nameArray) {
  const getName = nameArray === 'bot' ? 'bot' : 'friend';
  if (arrayWins.length >= 10) {
    const temporarily = arrayWins.slice(1, arrayWins.length);
    arrayWins.splice(0, arrayWins.length);
    temporarily.forEach((item) => {
      arrayWins.push(item);
    });
    console.log(arrayWins);
    localStorage.setItem(getName, JSON.stringify(arrayWins));
  }

  arrayWins.push(message);
  localStorage.setItem(getName, JSON.stringify(arrayWins));
  document.querySelector('.results').replaceChildren();
  JSON.parse(localStorage.getItem(getName)).map((item) => {
    const rowTr = document.createElement('tr');
    const winsText = document.createElement('td');
    winsText.innerHTML = item;
    rowTr.appendChild(winsText);
    return document.querySelector('.results').appendChild(rowTr);
  });

  winMessage.innerHTML = message;
  modalEnd.classList.remove('modal-end-off');
  modalEnd.classList.add('modal-end');
  modalEnd.classList.remove('modal-end-rebals');
  modalEnd.classList.remove('modal-end-empire');
  if (message === 'rebals') {
    modalEnd.classList.add('modal-end-rebals');
  }

  if (message === 'empire') {
    modalEnd.classList.add('modal-end-empire');
  }

  return message;
}

function checkWin(empire, rebals, arrayWins, nameArray, r2d2 = 'none') {
  for (let i = 0; i < arrWin.length; i += 1) {
    for (let j = 0; j < arrWin[i].length; j += 1) {
      if (cordsUsers.userBlack.includes(arrWin[i][j])) {
        countBlack += 1;
      }

      if (cordsUsers.userBlue.includes(arrWin[i][j])) {
        countBlue += 1;
      }

      if (countBlack >= 3) {
        return gameEnd(rebals, arrayWins, nameArray);
      }

      if (countBlue >= 3) {
        return r2d2 === 'none' ? gameEnd(empire, arrayWins, nameArray) : gameEnd(r2d2, arrayWins, nameArray);
      }
    }

    countBlue = 0;
    countBlack = 0;
  }

  if (counter < 0) {
    return gameEnd('draw', arrayWins, nameArray);
  }

  return '';
}

function friendGame(cord) {
  countFriendGame += 1;
  counter -= 1;
  const checkSide = sideChoose === 'empire' ? 'empire' : 'rebals';
  const checkSideRevers = sideChoose === 'empire' ? 'rebals' : 'empire';
  if (counter < 0) {
    checkWin(checkSide, checkSideRevers, arrayWinsFriend, 'friend');
  }

  if (!isEmpty(cord)) {
    if (countFriendGame % 2 === 0) {
      obj[cord].classList.add(checkSideRevers);
      cordsUsers.userBlack.push(cord);
    } else {
      obj[cord].classList.add(checkSide);
      cordsUsers.userBlue.push(cord);
    }
  }

  checkWin(checkSide, checkSideRevers, arrayWinsFriend, 'friend');
}

function botGame(cord) {
  counter -= 2;

  if (!isEmpty(cord)) {
    obj[cord].classList.add('rebals');
    cordsUsers.userBlack.push(cord);
    const test = checkWin('empire win', 'rebals win', arrayWinsBot, 'bot', 'r2d2 win');
    if (test !== '') {
      return test;
    }
  }

  checkWin('empire win', 'rebals win', arrayWinsBot, 'r2d2 win');
  let randomCords = randomTic();
  while (isEmpty(randomCords)) {
    if (counter < 0) {
      const test2 = checkWin('empire win', 'rebals win', arrayWinsBot, 'bot', 'r2d2 win');
      return test2;
    }

    randomCords = randomTic();
  }

  cordsUsers.userBlue.push(randomCords);
  obj[randomCords].classList.add('r2d2');
  const test3 = checkWin('empire win', 'rebals win', arrayWinsBot, 'bot', 'r2d2 win');
  return test3;
}

function createTableCross(func) {
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
        if (isEmpty(`${i},${j}`)) {
          return;
        }

        func(`${i},${j}`);
      });
    }

    table.appendChild(tr);
  }
}

buttonDarkSide.addEventListener('click', () => {
  chooseSide.classList.add('modal-choose-side-off');
  chooseSide.classList.remove('modal-choose-side');
  sideChoose = 'empire';
});

buttonLightSide.addEventListener('click', () => {
  chooseSide.classList.add('modal-choose-side-off');
  chooseSide.classList.remove('modal-choose-side');
  sideChoose = 'rebals';
});

playButton.addEventListener('click', () => {
  if (chooseBot.checked === true) {
    body.className = 'rd2d2-background';
    createTableCross(botGame);
  } else if (chooseFriend.checked === true) {
    chooseSide.classList.remove('modal-choose-side-off');
    chooseSide.classList.add('modal-choose-side');
    body.className = 'fight-background';
    createTableCross(friendGame);
  }

  prePlayMenu.classList.remove('pre-play-menu');
  prePlayMenu.classList.add('pre-play-menu-off');
});

buttonRestart.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      obj[`${i},${j}`].className = '';
      obj[`${i},${j}`].className = 'cell';
    }
  }

  counter = 8;
  countBlack = 0;
  countBlue = 0;
  cordsUsers.userBlack = [];
  cordsUsers.userBlue = [];
  countFriendGame = 0;
  modalEnd.classList.remove('modal-end');
  modalEnd.classList.add('modal-end-off');
});

buttonMenu.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      obj[`${i},${j}`].className = '';
      obj[`${i},${j}`].className = 'cell';
    }
  }

  counter = 8;
  countBlack = 0;
  countBlue = 0;
  cordsUsers.userBlack = [];
  cordsUsers.userBlue = [];
  countFriendGame = 0;
  modalEnd.classList.remove('modal-end');
  modalEnd.classList.add('modal-end-off');
  prePlayMenu.classList.add('pre-play-menu');
  prePlayMenu.classList.remove('pre-play-menu-off');
});
