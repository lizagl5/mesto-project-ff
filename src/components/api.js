// Для работы с API

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '70e783eb-c505-450e-9114-d893b593df43'
    }
  }

// Функция проверки ответа сервера и возвращения ответа или объекта ошибки
function handleRemoteResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    }

// Получить данные пользователя
const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(handleRemoteResponse)
}

// Получить данные карточек
const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(handleRemoteResponse)
}

// Обновить данные о пользователе на сервере
const updateRemoteProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            'authorization': '70e783eb-c505-450e-9114-d893b593df43',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then(handleRemoteResponse)
}

// Добавить новую карточку на сервер
const addRemoteCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            'authorization': '70e783eb-c505-450e-9114-d893b593df43',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
    })
    .then(handleRemoteResponse)
}

// Удалить карточку с сервера
const deleteRemoteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': '70e783eb-c505-450e-9114-d893b593df43',
        }
    })
    .then(handleRemoteResponse)
}

// Поставить лайк
const likeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleRemoteResponse)
}

// Убрать лайк
const unlikeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleRemoteResponse)
}

// Обновить аватар
const updateRemoteAvatar = (avatarLink) => {
    avatarLink
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'authorization': '70e783eb-c505-450e-9114-d893b593df43',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatarLink,
        })
    })
    .then(handleRemoteResponse)
}

export { getProfileData,  getCards, updateRemoteProfile, addRemoteCard, updateRemoteAvatar }
export { deleteRemoteCard, likeCard, unlikeCard }