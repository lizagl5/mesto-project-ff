import './index.css';
import { initialCards } from './cards';
import { createCard, removeCard, handleCardLike } from './components/card.js';
import { openPopup, closePopup, handlePopupCloseOverlay } from './components/modal.js';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileForm = document.forms['edit-profile'];
const jobInput = profileForm.elements.description;
const nameInput = profileForm.elements.name;
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');
const cardForm = document.forms['new-place'];
const nameCardInput = cardForm.elements['place-name'];
const linkCardInput = cardForm.elements.link;
const popupsList = document.querySelectorAll('.popup');
const buttonsPopupClose = document.querySelectorAll('.popup__close');

// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    cardsContainer.append(createCard(initialCards[i], popupImage, removeCard, handleCardLike, openPopupImage));
}

// Блок попапа профиля
// Функция открытия модального окна профиля
function openPopupProfile(popup) {
    openPopup(popup);
    jobInput.value = currentJob.textContent;
    nameInput.value = currentName.textContent;
}

// Открыть и закрыть модальное окно для редактирования профиля
buttonProfile.addEventListener('click', function() {
    openPopupProfile(popupProfile);
});

// Обработчик «отправки» формы профиля
function handleFormSubmitProfile(event) {
    event.preventDefault();
    currentJob.textContent = jobInput.value;
    currentName.textContent = nameInput.value;
    closePopup(popupProfile);
}

// Отправка новых данных из формы профиля
profileForm.addEventListener('submit', handleFormSubmitProfile);

// Блок попапа карточки
// Функция открытия модального окна добавления карточки
function openPopupCard(popup) {
    openPopup(popup);
}

// Открыть и закрыть модальное окно для добавления карточки
buttonCard.addEventListener('click', function() {
    openPopupCard(popupCard);
});

// Обработчик «отправки» формы карточки
function handleFormSubmitCard(event) {
    event.preventDefault();
    const cardFormData = {
        name: nameCardInput.value,
        link: linkCardInput.value
    };
    cardsContainer.prepend(createCard(cardFormData, popupImage, removeCard, handleCardLike, openPopupImage));
    cardForm.reset();
    closePopup(popupCard);
}

// Отправка новых данных из формы карточки
cardForm.addEventListener('submit', handleFormSubmitCard);

// Блок попапа картинки
// Функция открытия модального окна картинки
function openPopupImage(popup, link, name) {
    openPopup(popup);
    popupImageContent.src = link;
    popupImageContent.alt = name;
    popupCaption.textContent = name;
}

// Блок общих для всех попапов событий
// Добавить анимацию всем модальным окнам
popupsList.forEach(function(element) {
    element.classList.add('popup_is-animated');
});

// Закрыть по крестику
buttonsPopupClose.forEach(function(element) {
    element.addEventListener('click', function(event) {
    closePopup(event.target.closest('.popup'));
    });
});

// Закрыть по оверлею
popupsList.forEach(function(element) {
    element.addEventListener('click', function(event) {
    handlePopupCloseOverlay(event, element);
    });
});
