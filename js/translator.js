// Forma de simplificar los selectores para no escribirlos cada vez que se necesiten
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

	/* Función que se llama desde main.js con el lenguaje seleccionado , el cual se ingresa como parámetro en esta función */
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
		/* Recorrido por los elementos que se quieren traducir , y se reemplaza el texto anterior por el que se quiere traducir */
		this._elements.forEach((element) => {
			let text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], finalLang);
			if (text) {
				element.innerHTML = text;
			}
		});
	}
}

export default Translator;
