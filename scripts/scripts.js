const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const buttonsChange = document.querySelectorAll('.header__button-change');
const cardImage = document.querySelector('.card__image');
const body = document.querySelector('body');

const state = {
	gender: body.classList.contains('women') ? 'women' : 'men',
}

const brushButtons = (buttons, color) => {
	if (buttons.length) {
		buttons.forEach(item => {
			item.style.backgroundColor = color;
		});
	}
}

const changeToMen = () => {
	if (state.gender !== 'men') {
		body.classList.remove('women');
		body.classList.add('men');
		brushButtons(buttonsChange, '#1178B2');
		cardImage.src = './image/main/card-m-02-black.jpg';
		state.gender = 'men';
	}
}

const changeToWomen = () => {
	if (state.gender !== 'women') {
		body.classList.remove('men');
		body.classList.add('women');
		brushButtons(buttonsChange, '#C300C7');
		cardImage.src = './image/main/card-w-01.jpg';
		state.gender = 'women';
	}
}

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);



