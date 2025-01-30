// Для работы с карточками

// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

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

// Обработчик лайка карточки
function handleCardLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

// Экспорт
export { cardsContainer, createCard, removeCard, handleCardLike };