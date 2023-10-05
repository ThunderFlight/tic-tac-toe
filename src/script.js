import './style.css';

const arrChecked = [];
function randomTic() {
  return Math.floor(Math.random() * 2);
}
function check() {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (
        document.getElementsByClassName('table-tic-tac-toe')[0].children[i].children[j].style
          .backgroundColor === 'black'
        || document.getElementsByClassName('table-tic-tac-toe')[0].children[i].children[j].style
          .backgroundColor === 'blue'
      ) {
        arrChecked.push([i, j]);
      }
    }
  }
}
for (let i = 0; i < 3; i += 1) {
  const tr = document.createElement('tr');
  tr.className = 'line';
  for (let j = 0; j < 3; j += 1) {
    const td = document.createElement('td');
    tr.appendChild(td);
    td.className = 'cell';
    td.addEventListener('click', () => {
      td.style.backgroundColor = 'black';
      check();
      if (
        document.getElementsByClassName('table-tic-tac-toe')[0].children[randomTic()].children[
          randomTic()
        ].style.backgroundColor !== 'blue'
        || document.getElementsByClassName('table-tic-tac-toe')[0].children[randomTic()].children[
          randomTic()
        ].style.backgroundColor !== 'black'
      ) {
        document.getElementsByClassName('table-tic-tac-toe')[0].children[randomTic()].children[randomTic()].style.backgroundColor = 'blue';
      }
    });
  }
  document.querySelector('.table-tic-tac-toe').appendChild(tr);
}
// arrChecked.map((item) => {
//   if (item[0] !== randomTic()) {
//     return randomTic();
//   }
// return randomTic() });
