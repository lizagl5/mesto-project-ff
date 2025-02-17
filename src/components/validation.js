// Для валидации форм

// Функция добавления класса с ошибкой валидации
function showInputError(popupForm, inputForm, errorMessage, validationConfig) {
    const error = popupForm.querySelector(`.${inputForm.id}-error`);
    inputForm.classList.add(validationConfig.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(validationConfig.errorClass);
  };

// Функция удаления класса с ошибкой валидации
function hideInputError(popupForm, inputForm, validationConfig) {
    const error = popupForm.querySelector(`.${inputForm.id}-error`);
    inputForm.classList.remove(validationConfig.inputErrorClass);
    error.classList.remove(validationConfig.errorClass);
    error.textContent = '';
  };

// Функция проверки валидности поля
function isValid(popupForm, inputForm, validationConfig) {
    if (inputForm.validity.patternMismatch) {
      inputForm.setCustomValidity(inputForm.dataset.errorMessage);
    } else {
      inputForm.setCustomValidity('');
    }

    if (!inputForm.validity.valid) {
      showInputError(popupForm, inputForm, inputForm.validationMessage, validationConfig);
    } else {
      hideInputError(popupForm, inputForm, validationConfig);
    }
  };

// Функция валидации нескольких полей одного попапа
function setEventListeners(popupForm, validationConfig) {
  const inputList = Array.from(popupForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = popupForm.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      isValid(popupForm, inputElement, validationConfig);
      toggleSubmitButton(inputList, buttonElement, validationConfig);
    })
  })
}

// Функция проверки наличия невалидных полей
function hasInvalidInput (inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid
  });
}

// Функция блокировки отправки формы
function toggleSubmitButton(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// Функция включения валидации всех форм
function enableValidation(validationConfig) {
  const popupList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  popupList.forEach(function(popupElement) {
    popupElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });
    setEventListeners(popupElement, validationConfig);
  });
}; 

// Функция очищения ошибки валидации формы и изменения кнопки на неактивную
function clearValidation(popupForm, validationConfig) {
  const inputList = Array.from(popupForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = popupForm.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(function(inputElement) {
    hideInputError(popupForm, inputElement, validationConfig);
    inputElement.setCustomValidity("");
  });
  toggleSubmitButton(inputList, buttonElement, validationConfig)
}


export { enableValidation, clearValidation };
