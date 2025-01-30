import './index.css';
import { initialCards } from './cards';
import { cardsContainer, createCard, removeCard, handleCardLike } from './components/card.js';
import { openPopupProfile,  openPopupCard, openPopupImage, profileForm, jobInput, nameInput, currentName, currentJob } from './components/modal.js';

// DOM узлы
const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const nameCardInput = cardForm.elements['place-name'];
const linkCardInput = cardForm.elements.link;
const popupsList = document.querySelectorAll('.popup');

// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    cardsContainer.append(createCard(initialCards[i], removeCard, handleCardLike, openPopupImage));
}

// Открыть и закрыть модальное окно для редактирования профиля
buttonProfile.addEventListener('click', function() {
    openPopupProfile(popupProfile);
});

// Открыть и закрыть модальное окно для добавления карточки
buttonCard.addEventListener('click', function() {
    openPopupCard(popupCard);
});

// Обработчик «отправки» формы профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    currentJob.textContent = jobInput.value;
    currentName.textContent = nameInput.value;
    popupProfile.classList.remove('popup_is-opened');
}

// Обработчик «отправки» формы карточки
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    const cardFormData = {
        name: nameCardInput.value,
        link: linkCardInput.value
    };
    cardsContainer.prepend(createCard(cardFormData, removeCard));
    cardForm.reset();
    popupCard.classList.remove('popup_is-opened');
}

// Отправка новых данных из формы профиля
profileForm.addEventListener('submit', handleFormSubmitProfile);

// Отправка новых данных из формы карточки
cardForm.addEventListener('submit', handleFormSubmitCard);

// Добавить анимацию всем модальным окнам
popupsList.forEach(function (element) {
    element.classList.add('popup_is-animated');
});
