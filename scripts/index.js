// Темплейт карточки
const tmpCard = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function renderCard(link, name, removerFunction) {
    const cardElement = tmpCard.querySelector('li').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {removerFunction(deleteButton)
});
    return cardElement;
}

// Функция удаления карточки
function removeCard(button) {
    unwantedCard = button.closest('li');
    unwantedCard.remove();
}

// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    placesList.append(renderCard(initialCards[i].link, initialCards[i].name, removeCard));
}