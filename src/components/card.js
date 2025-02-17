// Для работы с карточками

import { currentName, currentJob } from '../index.js';
import { deleteRemoteCard, likeCard, unlikeCard } from '../components/api.js';

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
    likesNumber.textContent = cardData.likes.length;

    // Создать кнопку удаления карточки
    function createDeleteMarkup() {
        return `
            <button type="button" class="card__delete-button"></button>
        `;
      }

    // Проверить id пользователя и добавить кнопку удаления в случае совпадения
    function checkCardAuthor() {
        if ((cardData.ownerId === cardData.profileId) || (cardData.ownerId === 'mine')) {
            cardImage.insertAdjacentHTML('afterend', createDeleteMarkup())
        };
    }

    checkCardAuthor()

    // Проверить есть ли лайк от владельца профиля
    function checkMyLike() {
        for (let n = 0; n < cardData.likes.length; n++) {
            if ((cardData.likes[n].name === currentName.textContent) && (cardData.likes[n].about === currentJob.textContent)) {
                likeButton.classList.add('card__like-button_is-active');
            }
        }
    }
    
    checkMyLike()

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            handleDelete(cardElement, cardData.cardId)
        });
    }

    // Добавить лайк на карточку
    likeButton.addEventListener('click', function(event) {
        handleLike(event, cardData.cardId, likesNumber)
    });

    // Открыть и закрыть модальное окно для открытия картинки
    cardImage.addEventListener('click', function() {
        handlePopup(popup, cardData.link, cardData.name);
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(card, id) {
    deleteRemoteCard(id)
    .then(() => {
        card.remove();
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })
}

// Обработчик лайка карточки
function handleCardLike(event, id, likesNumber) {
    if (event.target.classList.contains('card__like-button_is-active')) {
        unlikeCard(id, likesNumber)
        .then((cardData) => {
            event.target.classList.remove('card__like-button_is-active')
            likesNumber.textContent = cardData.likes.length;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
    } else {
        likeCard(id)
        .then((cardData) => {
            event.target.classList.add('card__like-button_is-active')
            likesNumber.textContent = cardData.likes.length;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        }
}

// Экспорт
export { createCard, removeCard, handleCardLike }