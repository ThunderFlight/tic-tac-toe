/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("const arrChecked = [];\nfunction randomTic() {\n  return Math.floor(Math.random() * 3);\n}\nfunction check() {\n  for (let i = 0; i < 3; i += 1) {\n    for (let j = 0; j < 3; j += 1) {\n      if (\n        document.getElementsByClassName('tableTicTacToe')[0].children[i].children[j].style\n          .backgroundColor === 'black'\n      ) {\n        arrChecked.push([i, j]);\n      }\n    }\n  }\n}\nfor (let i = 0; i < 3; i += 1) {\n  const tr = document.createElement('tr');\n  tr.className = 'line';\n  for (let j = 0; j < 3; j += 1) {\n    const td = document.createElement('td');\n    tr.appendChild(td);\n    td.className = 'cell';\n    td.addEventListener('click', () => {\n      td.style.backgroundColor = 'black';\n      check();\n      document.getElementsByClassName('tableTicTacToe')[0].children[randomTic()].children[\n        j\n      ].style.backgroundColor = 'black';\n    });\n  }\n  document.querySelector('.tableTicTacToe').appendChild(tr);\n}\n// arrChecked.map((item) => item[0] !== randomTic())\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;