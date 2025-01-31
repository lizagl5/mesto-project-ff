// Для работы с модальными окнами

// DOM узлы
const profileForm = document.forms['edit-profile'];
const jobInput = profileForm.elements.description;
const nameInput = profileForm.elements.name;
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');

// Функция открытия модального окна
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    // Закрыть по Esc
    document.addEventListener('keydown', handlePopupCloseEsc);
}

// Функция закрытия модального окна
function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    // Удалить обработчик Esc
    document.removeEventListener('keydown', handlePopupCloseEsc);
}

// Обработчик закрытия по кнопке Esc
function handlePopupCloseEsc(event) {
    if (event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closePopup(currentPopup);
    }
}

// Обработчик закрытия по клику на оверлей
function handlePopupCloseOverlay(event, popup) {
    const overlay = !event.target.closest('.popup__content');
    if (overlay) {
        closePopup(popup);
    }
}

// Экспорт
export { openPopup, closePopup, handlePopupCloseOverlay, profileForm, jobInput, nameInput, currentName, currentJob };
