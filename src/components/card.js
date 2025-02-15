// Для работы с карточками

import { deleteRemoteCard } from '../components/api.js';

// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// Функция создания карточки 
function createCard(cardData, popup, handleDelete, handleLike, handlePopup) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesNumber = cardElement.querySelector('.card__likes-number');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likesNumber.textContent = cardData.likes;

    // Создать кнопку удаления карточки
    function createDeleteMarkup() {
        return `
            <button type="button" class="card__delete-button"></button>
        `;
      }

    // Проверить id пользователя и добавить кнопку удаления в случае совпадения
    function checkCardAuthor() {
        if (cardData.ownerId === cardData.profileId) {
            cardImage.insertAdjacentHTML('afterend', createDeleteMarkup())
        };
    }

    checkCardAuthor()

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            handleDelete(cardElement, cardData.cardId)
        });
    }

    // Добавить лайк на карточку
    likeButton.addEventListener('click', handleLike);

    // Открыть и закрыть модальное окно для открытия картинки
    cardImage.addEventListener('click', function() {
        handlePopup(popup, cardData.link, cardData.name);
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(card, id) {
    card.remove();
    deleteRemoteCard(id)
}

// Обработчик лайка карточки
function handleCardLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

// Экспорт
export { createCard, removeCard, handleCardLike };