// Для работы с карточками

// Импорты
// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// Функция создания карточки 
function createCard(cardData, popup, handleDelete, handleLike, handlePopup) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button')

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
        handleDelete(cardElement)
    });

    // Добавить лайк на карточку
    likeButton.addEventListener('click', handleLike);

    // Открыть и закрыть модальное окно для открытия картинки
    cardImage.addEventListener('click', function() {
        handlePopup(popup, cardData.link, cardData.name);
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(card) {
    card.remove();
}

// Обработчик лайка карточки
function handleCardLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

// Экспорт
export { createCard, removeCard, handleCardLike };