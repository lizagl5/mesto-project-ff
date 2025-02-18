import './index.css';
import { createCard, removeCard, handleCardLike } from './components/card.js';
import { openPopup, closePopup, handlePopupCloseOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfileData,  getCards, updateRemoteProfile, addRemoteCard, updateRemoteAvatar } from './components/api.js';


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
const avatar = document.querySelector('.profile__image');
const avatarForm = document.forms['edit-avatar'];
const popupAvatar = document.querySelector('.popup_type_avatar_edit');
const avatarInput = avatarForm.elements.avatarLink;

// Объект настроек для функции включения валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

// Блок попапа профиля
// Функция открытия модального окна профиля
function openPopupProfile(popup) {
    openPopup(popup);
    clearValidation(profileForm, validationConfig);
    jobInput.value = currentJob.textContent;
    nameInput.value = currentName.textContent;
}

// Открыть и закрыть модальное окно для редактирования профиля
buttonProfile.addEventListener('click', function() {
    openPopupProfile(popupProfile);
});

// Обработчик отправки формы профиля
function handleFormSubmitProfile(event) {
    event.preventDefault();
    renderLoading(popupProfile, true);
    updateRemoteProfile(nameInput.value, jobInput.value)
    .then(() => {
        currentJob.textContent = jobInput.value;
        currentName.textContent = nameInput.value;
        closePopup(popupProfile);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
        renderLoading(popupProfile, false)
    })
}

// Отправка новых данных из формы профиля
profileForm.addEventListener('submit', handleFormSubmitProfile);

// Блок попапа аватара
// Функция открытия модального окна редактирования аватара
function openPopupAvatar(popup) {
    openPopup(popup);
    clearValidation(avatarForm, validationConfig);
}

// Открыть и закрыть модальное окно для редактирования аватара
avatar.addEventListener('click', function() {
    openPopupAvatar(popupAvatar);
});

// Обработчик отправки формы редактирования аватара
function handleFormSubmitAvatar(event) {
    event.preventDefault();
    renderLoading(popupAvatar, true);
    updateRemoteAvatar(avatarInput.value)
    .then(() => {
        avatar.style.backgroundImage = `url(${avatarInput.value}`;
        avatarForm.reset();
        closePopup(popupAvatar);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
        renderLoading(popupAvatar, false)
    })
}

// Отправка новой картинки из формы редактирования аватара
avatarForm.addEventListener('submit', handleFormSubmitAvatar);

// Блок попапа карточки
// Функция открытия модального окна добавления карточки
function openPopupCard(popup) {
    openPopup(popup);
    clearValidation(cardForm, validationConfig);
}

// Открыть и закрыть модальное окно для добавления карточки
buttonCard.addEventListener('click', function() {
    openPopupCard(popupCard);
});

// Обработчик отправки формы карточки
function handleFormSubmitCard(event) {
    event.preventDefault();
    renderLoading(popupCard, true);
    addRemoteCard(nameCardInput.value, linkCardInput.value)
    .then((card) => {
        const cardData = {
            'name': card.name, 'link': card.link, 'likes': card.likes, 'cardId': card._id, 'ownerId': 'mine'
        }
        cardsContainer.prepend(createCard(cardData, popupImage, removeCard, handleCardLike, openPopupImage));
        cardForm.reset();
        closePopup(popupCard);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
        renderLoading(popupCard, false)
    })
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

// Запустить валидацию форм
enableValidation(validationConfig);


// Получить данные пользователя и карточки с сервера
const promisesProfileCards = [ getProfileData(), getCards() ]

Promise.all(promisesProfileCards)
    .then(([ profileData, cardsData ]) => {
        currentName.textContent = profileData.name;
        currentJob.textContent = profileData.about;
        avatar.style.backgroundImage = `url(${profileData.avatar}`;

        cardsData.forEach(function(card) {
            cardsContainer.append(
                createCard({
                    'name': card.name, 'link': card.link, 'likes': card.likes, 'cardId': card._id, 'ownerId': card.owner._id, 'profileId':  profileData._id
                }, 
                    popupImage, removeCard, handleCardLike, openPopupImage))
        });
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })

// Добавить отражение ожидания ответа от сервера
function renderLoading(popup, isLoading) {
    const buttonElement = popup.querySelector('.popup__button');
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
  }

