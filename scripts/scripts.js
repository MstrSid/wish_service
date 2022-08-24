const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const buttonsChange = document.querySelectorAll('.header__button-change');
let cardImage = document.querySelector('.card__image');
const body = document.querySelector('body');
const iconsSocial = document.querySelectorAll('.footer__link svg');
const links = document.querySelectorAll('a');
const cardText = document.querySelector('.card__text');
const buttonText = document.querySelector('.header__button-change_text');
const buttonImage = document.querySelector('.header__button-change_image');
const saveImage = document.querySelector('.header__button-save_image');

const state = {
	gender: body.classList.contains('women') ? 'women' : 'men',
}

const getRandomForArray = (arr) => {
	const randomNumber = Math.floor(Math.random() * arr.length);
	return arr[randomNumber];
}

const getData = () => {
	return fetch('./db.json').then(response => response.json());
}

const renderDOM = (isButtonChangeText = false) => { //проверка, меняем текст
	// или картинку
	if (!isButtonChangeText) { // если меняем картинку, для эффекта fade
		cardImage.remove();
		cardImage = document.createElement('img');
		cardImage.classList.add('fade');
		cardImage.alt = "Фон открытки";
		cardImage.width = 840;
		cardImage.height = 520;
		document.querySelector('.card__wrapper').prepend(cardImage);
	}
	cardImage.src = `./image/main/${state['photo']}`;
	cardText.innerHTML = state.text.replaceAll('\n', '<br>');
	cardText.style.color =
		state.photo.includes('black') ? '#FFFFFF' : '#000000';
}

const getDataToCard = async () => {
	const result = await getData();
	state.photo = getRandomForArray(result['photo'][state.gender]);
	state.text = getRandomForArray(result['text'][state.gender]);
	renderDOM();
}

const changeText = async () => {
	const result = await getData();
	state.text = getRandomForArray(result['text'][state.gender]);
	renderDOM(true);
}

const changeImage = async () => {
	const result = await getData();
	state.photo = getRandomForArray(result['photo'][state.gender]);
	renderDOM();
}

const preventUrlsDefault = (urls) => {
	urls.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
		})
	})
}

const brushButtons = (buttons, color) => {  //покраска кнопок
	if (buttons.length) {
		buttons.forEach(item => {
			item.style.backgroundColor = color;
		});
	}
}

const brushIcons = (icons, color) => { //покраска иконок
	if (icons.length) {
		icons.forEach(item => {
			item.style.fill = color;
		});
	}
}

const changeToMen = async () => {
	if (state.gender !== 'men') {
		state.gender = 'men';
		await getDataToCard();
		body.classList.remove('women');
		body.classList.add('men');
		brushButtons(buttonsChange, '#1178B2');
		brushIcons(iconsSocial, '#1178B2');
	}
}

const changeToWomen = async () => {
	if (state.gender !== 'women') {
		state.gender = 'women';
		await getDataToCard();
		body.classList.remove('men');
		body.classList.add('women');
		brushButtons(buttonsChange, '#C300C7');
		brushIcons(iconsSocial, '#C300C7');
	}
}

const saveCard = async () => {
	const elem = document.querySelector(".card__wrapper");
	cardImage.classList.remove('fade');
	await html2canvas(elem).then(canvas => {
		window.open('about:blank', 'Card').document.write("<img" +
			" src='" + canvas.toDataURL() + "' alt='from canvas'/>");
	});
	cardImage.classList.add('fade');
}

saveImage.addEventListener('click', saveCard);


preventUrlsDefault(links);
buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);
getDataToCard();



