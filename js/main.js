import Translator from './translator.js';

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

// Función para que el usuario introduzca su nombre (esta función se autoejecuta)
let userName;
let computer = 'Computer';
(() => {
	while (userName === '' || userName === undefined || userName.length < 1 || userName.length >= 10) {
		let userPrompt = prompt('Write down your name please (No more than 10 characters)');
		userName = userPrompt.trim();
	}
	drawPlayersData();
})();
// ------------- //

// Función para que generar un turno random para el principio del juego
function randomTurn() {
	let turnsArray = [userName, computer];
	let randomTurn = Math.floor(Math.random() * turnsArray.length);
	turn = turnsArray[randomTurn];
	playerTurn.innerText = turn;
}
// ------------- //

// Funcion para mostrar los datos de los jugadores y que letra corresponde a cada uno
function drawPlayersData() {
	userScoreboardTitle.innerText = userName;
	randomTurn();
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
			if (turn === 'Computer' || turn === 'Computadora') {
				paintBoard();
			}
		});
	}
}

// --- Start Game --- //
const boardSquares = $$('button.square');
let squaresArray = [];
let availableSquaresArray = [];

for (let i = 0; i < boardSquares.length; i++) {
	squaresArray.push(boardSquares[i]);
	boardSquares[i].addEventListener('click', () => {
		if (userLetter === undefined) {
			if (computer === 'Computer') {
				return alert('You have to choose a letter first');
			} else {
				return alert('Primero debes elegir una letra');
			}
		} else {
			boardSquares[i].disabled = true;
			boardSquares[i].innerText = userLetter;
			winner();
			// Ver una manera más piola para no tener que poner lo del gameOver
			if (gameOver !== 1) {
				nextTurn();
				setTimeout(() => {
					paintBoard();
				}, 500);
			}
		}
	});
}

// Función para mostrar los turnos en cada jugada
function nextTurn() {
	if (turn === computer) {
		playerTurn.innerText = userName;
		return (turn = userName);
	} else {
		playerTurn.innerText = computer;
		return (turn = computer);
	}
}

// Función para pintar el tablero
function paintBoard() {
	setTimeout(() => {
		nextTurn();
		availableSquaresArray = [];
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
	}, 500);
}
// ------------- //

// --- Winner section --- //
let userCounter = 0;
let computerCounter = 0;
let drawCounter = 0;
const userScoreboard = $('.user-scoreboard');
const computerScoreboard = $('.computer-scoreboard');
const drawScoreboard = $('.draw-scoreboard');
let gameOver = 0;

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
		gameOver = 1;
		setTimeout(() => {
			if (computer === 'Computer') {
				return alert(`${userName} wins!`);
			} else {
				return alert(`${userName} gana!`);
			}
		}, 500);
		userCounter++;
		userScoreboard.innerText = userCounter;
		cleanTicTacToe();
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
		gameOver = 1;
		setTimeout(() => {
			if (computer === 'Computer') {
				return alert('Computer wins!');
			} else {
				return alert('Computadora gana!');
			}
		}, 500);
		computerCounter++;
		computerScoreboard.innerText = computerCounter;
		cleanTicTacToe();
	} else if (drawCase) {
		gameOver = 1;
		setTimeout(() => {
			if (computer === 'Computer') {
				return alert('Draw!');
			} else {
				return alert('Empate!');
			}
		}, 500);
		drawCounter++;
		drawScoreboard.innerText = drawCounter;
		cleanTicTacToe();
	}
}
// ------------- //

// --- Clean Board of The TicTacToe section --- //
function cleanTicTacToe() {
	setTimeout(() => {
		boardSquares.forEach((square) => {
			square.textContent = '';
			square.disabled = false;
		});
		letterButtons.forEach((letter) => {
			letter.disabled = false;
			letter.style.backgroundColor = 'var(--dark-green)';
		});
		randomTurn();
		gameOver = 0;
		userLetter = undefined;
	}, 500);
}
// ------------- //

// --- Clean Board and Scoreboard of The TicTacToe section --- //
const restartScoreboardButton = $('.restart-scoreboard');
restartScoreboardButton.addEventListener('click', () => {
	cleanTicTacToe();
	userCounter = 0;
	userScoreboard.innerText = userCounter;
	computerCounter = 0;
	computerScoreboard.innerText = computerCounter;
	drawCounter = 0;
	drawScoreboard.innerText = drawCounter;
});
// ------------- //

// --- Translator section --- //
let translator = new Translator({
	persist: true,
	languages: ['es', 'en'],
});

const spanishButton = $('button.language.spanish');
const spanishButtonImg = $('button.language.spanish img');
const englishButton = $('button.language.english');
const englishButtonImg = $('button.language.english img');

spanishButton.addEventListener('click', () => {
	computer = 'Computadora';
	translator.load('es');
	if (!spanishButtonImg.classList.contains('active')) {
		spanishButtonImg.classList.add('active');
		englishButtonImg.classList.remove('active');
	}
});
englishButton.addEventListener('click', () => {
	computer = 'Computer';
	translator.load('en');
	if (!englishButtonImg.classList.contains('active')) {
		englishButtonImg.classList.add('active');
		spanishButtonImg.classList.remove('active');
	}
});
// ------------- //

// Como cambiar el idioma de lo que se dice por las alertas
// Ver como arreglar que se cruzan los turnos