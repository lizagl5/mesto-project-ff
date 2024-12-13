// Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, handleDelete) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
        handleDelete(cardElement)
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(card) {
    card.remove();
}

// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    cardsContainer.append(createCard(initialCards[i], removeCard));
}