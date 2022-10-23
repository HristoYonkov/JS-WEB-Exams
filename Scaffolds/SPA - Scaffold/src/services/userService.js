export function setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function getToken() {
    const user = getUser();
    if (user) {
        return user.accessToken;
    } else {
        return null;
    }
}

export function clearUser() {
    localStorage.removeItem('user');
}