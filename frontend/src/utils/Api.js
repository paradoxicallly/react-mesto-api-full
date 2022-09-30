class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
        .then(res => this._checkResponse(res))
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
        .then(res => this._checkResponse(res))
    }
  
    setUserInfo(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
              })
        })
        .then(res => this._checkResponse(res))
    }

    addCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then(res => this._checkResponse(res))
    }
    
    removeCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(res => this._checkResponse(res))
    }

    changeAvatar(url) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: url
              })
        })
        .then(res => this._checkResponse(res))
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(res => this._checkResponse(res))
        } else {
            return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this.headers,
            })
            .then(res => this._checkResponse(res))
        }
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
      }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

  }

export const api = new Api({
    baseUrl: 'https://api.paradoxically.nomoredomains.icu',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });