// Для работы с модальными окнами

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
export { openPopup, closePopup, handlePopupCloseOverlay };
