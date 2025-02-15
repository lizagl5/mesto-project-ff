// Для работы с API

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '70e783eb-c505-450e-9114-d893b593df43'
    }
  }


// Получить данные пользователя
const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data
    })
}

// Получить данные карточек
const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data
    })
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
      .then((res) => {
        return res.json()
    })
      .then((data) => {
        return data
    })
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
      .then((res) => {
        return res.json()
    })
      .then((data) => {
        return data
    })
}

// Удалить карточку с сервера
export const deleteRemoteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': '70e783eb-c505-450e-9114-d893b593df43',
        }
    })
      .then((res) => {
        return res.json()
    })
      .then((data) => {
        return data
    })
}

export { getProfileData,  getCards, updateRemoteProfile, addRemoteCard }