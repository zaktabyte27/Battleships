/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   battleships: () => (/* binding */ battleships)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./square */ \"./src/square.js\");\n/*\nThis game will be pretty easy to make.\n1)Firstly create a board using a lot of square classes and then append it to a game class\n2)Create game class with player class and board array. Create getSquareIndex, in bounds function\n3)Create ship class which simply put takes a single value, health which is also its length. Add a .hit function to reduce hitpoints. \n4)Each square has a attribute of .ship on square which is linked to the ship class. \n5)Easy\n*/\n\n\n\n\nconst game = class{\n    constructor(){\n        this.playerBoard = []\n        this.computerBoard = []\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__.player(\"Zaki\")\n        this.computer = new _player__WEBPACK_IMPORTED_MODULE_1__.player(\"computer\")\n        this.messageBox = document.querySelector(\".messages\")\n        this.ships = [\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Battleship\",4,this.player),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Carrier\",5,this.player),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Destroyer\",3,this.player),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Submarine\",3,this.player),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Patrol\",2,this.player)\n        ]\n        this.computerShips = [\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Battleship\",4,this.computer),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Carrier\",5,this.computer),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Destroyer\",3,this.computer),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Submarine\",3,this.computer),\n            new _ship__WEBPACK_IMPORTED_MODULE_0__.ship(\"Patrol\",2,this.computer)\n        ]\n        this.rows = 8\n        this.columns = 8\n        this.compContainer = document.querySelector(\".computerSide\")\n        this.compContainer.style.display = \"none\"\n        this.createBoard()\n        this.placeShips()\n        this.computerPlace()\n    }\n    GetIndexOfSquare(ref){\n        let row = Math.floor(ref/10)\n        let column =  (ref%10)\n        return (row-1) * this.columns +(column-1)\n    }\n    checkValid(ref,size,plyr){\n        for (let i = 0; i<size; i++){\n            let row = Math.floor((ref+i)/10)\n            let column = ((ref+i)% 10)\n            if (row < 1 || row > this.rows){\n                return false\n            } else if (column < 1 || column > this.columns){ \n                return false\n            } else if (plyr){\n                if (this.playerBoard[this.GetIndexOfSquare(ref+i)].pieceInSquare != null){\n                    return false\n                }\n            } else if (plyr == false){\n                if (this.computerBoard[this.GetIndexOfSquare(ref+i)].pieceInSquare != null){\n                    return false\n                }\n            }\n        }\n        return true\n    }\n    createBoard(){\n        let container = document.querySelector(\".cContainer\")\n        for (let row = 1; row < this.rows+1; row++){\n            let x = document.createElement(\"div\")\n            x.classList.add(\"row\")\n            for (let column = 1; column < this.columns+1; column++){\n                let num = parseInt(String(row)+String(column))\n                let y = new _square__WEBPACK_IMPORTED_MODULE_2__.square(num)\n                this.computerBoard.push(y)\n                x.append(y.square)\n            }\n            container.append(x)\n        }\n        //Create computer board\n        let newcontainer = document.querySelector(\".pContainer\")\n        for (let row = 1; row < this.rows+1; row++){\n            let x = document.createElement(\"div\")\n            x.classList.add(\"row\")\n            for (let column = 1; column < this.columns+1; column++){\n                let num = parseInt(String(row)+String(column))\n                let y = new _square__WEBPACK_IMPORTED_MODULE_2__.square(num)\n                this.playerBoard.push(y)\n                x.append(y.square)\n            }\n            newcontainer.append(x)\n        }\n        //Create player board\n    }\n    clearBoard(){\n        for (const sqre of this.playerBoard){\n            if (sqre.pieceInSquare == null){\n                sqre.square.style.backgroundColor = \"white\"\n            } \n        }\n    }\n    displayShip(idx,size){\n        for (let i = 0; i< size; i++){\n            this.playerBoard[idx+i].square.style.backgroundColor = \"green\"\n        }\n        // this displays the ship when hovering\n    }\n    placeShip(idx,ship,plyer){\n        if (plyer) {\n            for (let i =0; i<ship.size; i++){\n                this.playerBoard[idx+i].square.style.backgroundColor = \"green\"\n                this.playerBoard[idx+i].pieceInSquare = ship\n            }\n        } else if (plyer == false) {\n            for (let i =0; i<ship.size; i++){\n                this.computerBoard[idx+i].pieceInSquare = ship\n            }\n        }\n        // displays the ship permanently when a square is clicked\n    }\n    placeShips(){\n        let pointer = 0\n        let placed = false\n        let currentShip = this.ships[pointer]\n        document.addEventListener('mouseover', e => {\n            if (e.target.className == \"square\" && placed != true){\n                this.clearBoard()\n                let num = e.target.getAttribute(\"value\")\n                let squareIndex = this.GetIndexOfSquare(num)\n                if (this.checkValid(parseInt(num),currentShip.size,true)){\n                    this.displayShip(squareIndex,currentShip.size)\n                }\n            }\n        }, {passive: true})\n        document.addEventListener(\"click\",(e)=>{\n            if (e.target.className == \"square\" && placed != true){\n                let num = e.target.getAttribute(\"value\")\n                let squareIndex = this.GetIndexOfSquare(num)\n                if (this.checkValid(parseInt(num),currentShip.size,true)){\n                    this.placeShip(squareIndex,currentShip,true)\n                    pointer ++\n                    if (pointer == 5){\n                        placed = true\n                        this.compContainer.style.display = \"grid\"\n                        this.messageBox.textContent = \"Player turn\"\n                        this.mainCycle()\n                    } else {\n                        currentShip = this.ships[pointer]\n                    }\n                }\n            }\n        },{passive:true})\n    }\n    getRandomInt(min, max) {\n        min = Math.ceil(min);\n        max = Math.floor(max);\n        return Math.floor(Math.random() * (max - min + 1)) + min;\n    }\n    computerPlace(){\n        let pointer = 0\n        while (pointer != 5){\n            let currentShip = this.computerShips[pointer]\n            let num = this.getRandomInt(11,88)\n            let squareIndex = this.GetIndexOfSquare(num)\n            if (this.checkValid(parseInt(num),currentShip.size,false)){\n                this.placeShip(squareIndex,currentShip,false)\n                pointer ++\n           }\n        }\n    }\n    mainCycle(){\n        let finished = false\n        let hit = true\n        document.addEventListener(\"click\",(e)=>{\n            if (finished != true){\n                var num = e.target.getAttribute(\"value\")\n                var squareHit = this.computerBoard[this.GetIndexOfSquare(num)]\n                if (e.target.className == \"square\" && e.target.parentElement.parentElement.className == \"cContainer\" && e.target.textContent == \"\" && hit ==true){\n                    if (squareHit.pieceInSquare != null){\n                        hit = true\n                        let shipInSquare = squareHit.pieceInSquare\n                        shipInSquare.hit()\n                        squareHit.square.textContent = \"X\"\n                        squareHit.square.style.color = \"red\"\n                        squareHit.square.style.backgroundColor = \"grey\"\n                        this.messageBox.textContent = \"Hit\"\n                        if (shipInSquare.health == 0){\n                            shipInSquare.sunk()\n                            this.messageBox.textContent = \"Sunk \"+shipInSquare.name\n                        }\n                        if (this.computer.health == 0){\n                            finished = true\n                            this.messageBox.textContent = \"Player won\"\n                        }\n                    } else {\n                        hit = false\n                        squareHit.square.textContent = \"X\"\n                        squareHit.square.style.color = \"black\"\n                    }\n                }\n                //player loop\n                if (hit == false){\n                    var num = null\n                    var squareHit = null\n                    let missed = false\n                    while (missed != true){\n                        let empty = false\n                        while (empty != true){\n                            var num = this.getRandomInt(11,88)\n                            var squareHit = this.playerBoard[this.GetIndexOfSquare(num)]\n                            if (squareHit.square.textContent != \"X\"){\n                                empty = true\n                            }\n                        }\n                        if (squareHit.pieceInSquare != null){\n                            let shipInSquare = squareHit.pieceInSquare\n                            shipInSquare.hit()\n                            squareHit.square.textContent = \"X\"\n                            squareHit.square.style.color = \"red\"\n                            if (shipInSquare.health == 0){\n                                shipInSquare.sunk()\n                            }\n                            if (this.player.health == 0){\n                                finished = true\n                                this.messageBox.textContent = \"Computer won\"\n                            }\n                        } else {\n                            missed = true\n                            squareHit.square.textContent = \"X\"\n                            squareHit.square.style.color = \"black\"\n                            hit = true\n                        }\n                    }\n                }\n            //Computer loop\n           }\n         })\n    }\n}\n\nconst battleships = new game()\n\n\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   player: () => (/* binding */ player)\n/* harmony export */ });\nconst player = class{\n    constructor(name){\n        this.name = name\n        this.health = 17\n    }\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ship: () => (/* binding */ ship)\n/* harmony export */ });\nconst ship = class{\n    constructor(name,size,belongsTo){\n        this.name = name\n        this.size = size\n        this.health = this.size\n        this.belongsTo = belongsTo\n        this.placed = false\n    }\n    hit(){\n        this.health--\n    }\n    sunk(){\n        this.belongsTo.health -=this.size\n    }\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/ship.js?");

/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   square: () => (/* binding */ square)\n/* harmony export */ });\nconst square = class{\n    constructor(num){\n        this.pieceInSquare = null\n        this.square = document.createElement(\"div\")\n        this.square.classList.add(\"square\")\n        this.square.setAttribute(\"value\",num)\n    }\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/square.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;