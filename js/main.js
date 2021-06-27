// Forma de simplificar los selectores para no escribirlos cada vez que se necesiten
function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}

// --- Players Turn --- //
const playerTurn = $('.player-turn');
const userScoreboardTitle = $('.user-h4');
const letterButtons = $$('.letter-button');
let turn;
let userLetter;
let computerLetter;

// Funcion para mostrar los datos de los jugadores y que letra corresponde a cada uno
function drawPlayersData(userName) {
	userScoreboardTitle.innerText = userName;
	let turnsArray = [userName, 'computer'];
	let randomTurn = Math.floor(Math.random() * turnsArray.length);
	turn = turnsArray[randomTurn];
	playerTurn.innerText = turn;
	for (let i = 0; i < letterButtons.length; i++) {
		letterButtons[i].addEventListener('click', (e) => {
			letterButtons[0].disabled = true;
			letterButtons[1].disabled = true;
			letterButtons[i].style.backgroundColor = 'var(--dark-grey)';
			if (e.target.classList[1] === 'x-button') {
				userLetter = 'X';
				computerLetter = 'O';
			} else {
				userLetter = 'O';
				computerLetter = 'X';
			}
			paintBoard(userName);
		});
	}
}

// Función para que el usuario introduzca su nombre (esta función se autoejecuta)
(() => {
	let userName;
	while (userName === '' || userName === undefined || userName.length < 1 || userName.length >= 10) {
		let userPrompt = prompt('Write down your name please (No more than 10 characters)');
		userName = userPrompt.trim();
	}
	drawPlayersData(userName);
})();
// ------------- //

// --- Start Game --- //
const boardSquares = $$('.board-grid-container button.square');
boardSquares.forEach((square) => {
	square.addEventListener('click', () => {
		if (userLetter === undefined) {
			alert('You have to choose a letter first');
		}
	});
});

let squaresArray = [];
let availableSquaresArray = [];
// Función para pintar el tablero
function paintBoard(userName) {
	for (let i = 0; i < boardSquares.length; i++) {
		boardSquares[i].addEventListener('click', (e) => {
			boardSquares[i].disabled = true;
			boardSquares[i].innerText = userLetter;
			// turn = 'computer';
		});
		squaresArray.push(boardSquares[i]);
		// if (boardSquares[i].disabled === false) {
		// 	availableSquaresArray.push(boardSquares[i]);
		// }
	}
	if (turn === 'computer') {
		let randomSquare = Math.floor(Math.random() * squaresArray.length);
		console.log(randomSquare);
		boardSquares[randomSquare].disabled = true;
		boardSquares[randomSquare].innerText = computerLetter;
		// turn = userName;
	}
	console.log(squaresArray);
	console.log(availableSquaresArray, 'disponibles');
}
// HAY QUE VER COMO HACER PARA QUE LA MÁQUINA SIGA ESCRIBIENDO EN POSICIONES ALEATORIAS DISPONIBLES
// ------------- //

// --- Turns section --- //
// function computerTurn(userName) {
// 	let randomSquare = Math.floor(Math.random() * availableSquaresArray.length);
// 	console.log(randomSquare);
// 	boardSquares[randomSquare].disabled = true;
// 	boardSquares[randomSquare].innerText = computerLetter;
// 	turn = userName;
// }
// ------------- //

