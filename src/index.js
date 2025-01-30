import './index.css';
import { initialCards } from './cards';

// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const buttonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const jobInput = profileForm.elements.description;
const nameInput = profileForm.elements.name;
const cardForm = document.forms['new-place'];
const nameCardInput = cardForm.elements['place-name'];
const linkCardInput = cardForm.elements.link;
const popupsList = document.querySelectorAll('.popup');

// Функция создания карточки
function createCard(cardData, handleDelete, handleLike, handlePopup) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const popupImage = document.querySelector('.popup_type_image');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
        handleDelete(cardElement)
    });

    // Добавить лайк на карточку
    cardsContainer.addEventListener('click', handleLike);

    // Открыть и закрыть модальное окно для открытия картинки
    cardImage.addEventListener('click', function() {
        handlePopup(popupImage, cardData.link, cardData.name);
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(card) {
    card.remove();
}

// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    cardsContainer.append(createCard(initialCards[i], removeCard, handleCardLike, openPopupImage));
}





// Функция открытия модального окна профиля
function openPopupProfile(popup) {
    popup.classList.add('popup_is-opened');
    jobInput.value = currentJob.textContent;
    nameInput.value = currentName.textContent;
    closePopup(popup);
}

// Функция открытия модального окна добавления карточки
function openPopupCard(popup) {
    popup.classList.add('popup_is-opened');
    closePopup(popup);
}

// Функция открытия модального окна картинки
function openPopupImage(popup, link, name) {
    const popupImage = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    popup.classList.add('popup_is-opened');
    closePopup(popup);
}

// Функция закрытия любого модального окна
function closePopup(popup) {
    const buttonPopupClose = popup.querySelector('.popup__close');
    // Закрыть по крестику
    buttonPopupClose.addEventListener('click', function() {
        popup.classList.remove('popup_is-opened')
    });
    // Закрыть по оверлею
    popup.addEventListener('click', function(event) {
        const overlay = !event.target.closest('.popup__content');
        if (overlay) {
            popup.classList.remove('popup_is-opened');
        }
    });
    // Закрыть по Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            popup.classList.remove('popup_is-opened');
        }
    });
    // Удалить обработчик Esc
    document.removeEventListener('keydown', function() {
        closePopup();
    });
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

// Обработчик лайка карточки
function handleCardLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

// Добавить анимацию всем модальным окнам
popupsList.forEach(function (element) {
    element.classList.add('popup_is-animated');
});
