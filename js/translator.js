/* A way to simplify the selectors to avoid writing them every time i need it */
function $$(selector) {
	return document.querySelectorAll(selector);
}

class Translator {
	constructor() {
		this._elements = $$('[data-i18n]');
		this._spanishChanges = {
			header: {
				title: 'Ta-te-Ti',
			},
			letter: {
				title: 'Elija una letra',
			},
			turn: {
				title: 'Turno de',
			},
			scoreboard: {
				title: 'Marcador',
				computer: 'Computadora',
				draws: 'Empates',
			},
			restartScoreboard: {
				title: 'Reiniciar marcador',
			},
		};
		this._englishChanges = {
			header: {
				title: 'Tic-Tac-Toe',
			},
			letter: {
				title: 'Choose a letter',
			},
			turn: {
				title: 'Turn of',
			},
			scoreboard: {
				title: 'Scoreboard',
				computer: 'Computer',
				draws: 'Draws',
			},
			restartScoreboard: {
				title: 'Restart scoreboard',
			},
		};
	}

	/* Function which it's called from "main.js" with the language selected. This language is the parameter of this function. */
	changeLanguage(lang) {
		let finalLang;
		switch (lang) {
			case 'es':
				finalLang = this._spanishChanges;
				break;
			case 'en':
				finalLang = this._englishChanges;
				break;
			default:
				console.error("Sorry , we can't translate the page");
		}
		/* Scroll through the elements to be translated, and it is replaced the previous text with the language the user want to translate it.  */
		this._elements.forEach((element) => {
			let text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], finalLang);
			if (text) {
				element.innerHTML = text;
			}
		});
	}
}

export default Translator;
