// Для работы с модальными окнами

// DOM узлы
const profileForm = document.forms['edit-profile'];
const jobInput = profileForm.elements.description;
const nameInput = profileForm.elements.name;
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');

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

// Экспорт
export { openPopupProfile,  openPopupCard, openPopupImage, closePopup, profileForm, jobInput, nameInput, currentName, currentJob };
