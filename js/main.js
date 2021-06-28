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
function drawPlayersData() {
	userScoreboardTitle.innerText = userName;
	let turnsArray = [userName, 'Computer'];
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
			paintBoard();
		});
	}
}

// Función para que el usuario introduzca su nombre (esta función se autoejecuta)
let userName;
(() => {
	while (userName === '' || userName === undefined || userName.length < 1 || userName.length >= 10) {
		let userPrompt = prompt('Write down your name please (No more than 10 characters)');
		userName = userPrompt.trim();
	}
	drawPlayersData();
})();
// ------------- //

// --- Start Game --- //
const boardSquares = $$('button.square');
let squaresArray = [];
let availableSquaresArray = [];

for (let i = 0; i < boardSquares.length; i++) {
	squaresArray.push(boardSquares[i]);
	boardSquares[i].addEventListener('click', () => {
		if (userLetter === undefined) {
			alert('You have to choose a letter first');
			return false;
		} else {
			boardSquares[i].disabled = true;
			boardSquares[i].innerText = userLetter;
			turn = 'Computer';
			paintBoard();
		}
	});
}

// Función para pintar el tablero
function paintBoard() {
	availableSquaresArray = [];
	if (turn === 'Computer') {
		for (let i = 0; i < boardSquares.length; i++) {
			if (boardSquares[i].disabled === false) {
				availableSquaresArray.push(boardSquares[i]);
				console.log(availableSquaresArray, 'disponibles');
			}
		}
		let randomSquare = Math.floor(Math.random() * availableSquaresArray.length);
		console.log(randomSquare, 'principio computer random');
		if (availableSquaresArray !== []) {
			availableSquaresArray[randomSquare].disabled = true;
			availableSquaresArray[randomSquare].innerText = computerLetter;
			winner();
		}
	}
}
// ------------- //

// --- Winner section --- //
function winner() {
	let square0 = boardSquares[0].textContent;
	let square1 = boardSquares[1].textContent;
	let square2 = boardSquares[2].textContent;
	let square3 = boardSquares[3].textContent;
	let square4 = boardSquares[4].textContent;
	let square5 = boardSquares[5].textContent;
	let square6 = boardSquares[6].textContent;
	let square7 = boardSquares[7].textContent;
	let square8 = boardSquares[8].textContent;

	// Casos para que el usuario gane
	const firstCaseUserWinner = square0 === userLetter && square1 === userLetter && square2 === userLetter;
	const secondCaseUserWinner = square3 === userLetter && square4 === userLetter && square5 === userLetter;
	const thirdCaseUserWinner = square6 === userLetter && square7 === userLetter && square8 === userLetter;
	const fourthCaseUserWinner = square0 === userLetter && square3 === userLetter && square6 === userLetter;
	const fifthCaseUserWinner = square1 === userLetter && square4 === userLetter && square7 === userLetter;
	const sixthCaseUserWinner = square2 === userLetter && square5 === userLetter && square8 === userLetter;
	const seventhCaseUserWinner = square0 === userLetter && square4 === userLetter && square8 === userLetter;
	const eighthCaseUserWinner = square2 === userLetter && square4 === userLetter && square6 === userLetter;

	// Casos para que la computadora gane
	const firstCaseComputerWinner = square0 === computerLetter && square1 === computerLetter && square2 === computerLetter;
	const secondCaseComputerWinner = square3 === computerLetter && square4 === computerLetter && square5 === computerLetter;
	const thirdCaseComputerWinner = square6 === computerLetter && square7 === computerLetter && square8 === computerLetter;
	const fourthCaseComputerWinner = square0 === computerLetter && square3 === computerLetter && square6 === computerLetter;
	const fifthCaseComputerWinner = square1 === computerLetter && square4 === computerLetter && square7 === computerLetter;
	const sixthCaseComputerWinner = square2 === computerLetter && square5 === computerLetter && square8 === computerLetter;
	const seventhCaseComputerWinner = square0 === computerLetter && square4 === computerLetter && square8 === computerLetter;
	const eighthCaseComputerWinner = square2 === computerLetter && square4 === computerLetter && square6 === computerLetter;

	// Caso de empate
	const drawCase =
		square0 !== '' &&
		square1 !== '' &&
		square2 !== '' &&
		square3 !== '' &&
		square4 !== '' &&
		square5 !== '' &&
		square6 !== '' &&
		square7 !== '' &&
		square8 !== '';

	if (
		firstCaseUserWinner ||
		secondCaseUserWinner ||
		thirdCaseUserWinner ||
		fourthCaseUserWinner ||
		fifthCaseUserWinner ||
		sixthCaseUserWinner ||
		seventhCaseUserWinner ||
		eighthCaseUserWinner
	) {
		setTimeout(() => {
			return alert(`${userName} wins!`);
		}, 500);
		// cleanTicTacToe();
	} else if (
		firstCaseComputerWinner ||
		secondCaseComputerWinner ||
		thirdCaseComputerWinner ||
		fourthCaseComputerWinner ||
		fifthCaseComputerWinner ||
		sixthCaseComputerWinner ||
		seventhCaseComputerWinner ||
		eighthCaseComputerWinner
	) {
		setTimeout(() => {
			return alert('Computer wins!');
		}, 500);
		// cleanTicTacToe();
	} else if (drawCase) {
		setTimeout(() => {
			return alert('Draw!');
		}, 500);
		// cleanTicTacToe();
	}
}
// ------------- //

// --- Clean Board of The TicTacToe section --- //
// function cleanTicTacToe() {
// 	boardSquares.forEach((square) => {
// 		square.textContent = '';
// 		square.disabled = false;
// 	});
// }
// ------------- //
