import './style.css';

const arrWin = [['0,0', '0,1', '0,2'], ['1,0', '1,1', '1,2'], ['2,0', '2,1', '2,2'], ['0,0', ' 1,0', '2,0'], ['0,2', '1,2', '2,2'], ['0,0', '1,1', '2,2'], ['2,0', '1,1', '2,0']];
let countBlack = 0;
let countBlue = 0;
const obj = {};
let counter = 8;
const cordsUsers = {
  userBlue: [],
  userBlack: [],
};

function randomTic() {
  return `${Math.floor(Math.random() * 3)},${Math.floor(Math.random() * 3)}`;
}

function isEmpty(cords) {
  const objCords = obj[cords].style.backgroundColor;
  return objCords !== 'black' && objCords !== 'blue';
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
        return 'black win';
      }
      if (countBlue >= 3) {
        return 'blue win';
      }
    }
    countBlue = 0;
    countBlack = 0;
  }
  return 'ddd';
}

function botGame() {
  if (counter <= 0) {
    return;
  }
  let randomCords = randomTic();
  while (!isEmpty(randomCords)) {
    randomCords = randomTic();
  }
  cordsUsers.userBlue.push(randomCords);
  obj[randomCords].style.backgroundColor = 'blue';
  counter -= 1;
  console.log(checkWin());
}

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
      td.style.backgroundColor = 'black';
      cordsUsers.userBlack.push(`${i},${j}`);
      counter -= 1;
      botGame();
    });
  }
  document.querySelector('.table-tic-tac-toe').appendChild(tr);
}
