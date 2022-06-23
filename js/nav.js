function getID(id) {
    return document.getElementById(id);
}

function openMenu() {
    getID('nav').classList.add('show');
    getID('mobile-img').src = 'img/close.png';
    getID('content').classList.add('d-none-mobile');
    getID('mobile').setAttribute('onclick', 'closeMenu()');
}

function closeMenu() {
    getID('nav').classList.remove('show');
    getID('mobile-img').src = 'img/menu.png';
    getID('content').classList.remove('d-none-mobile');
    getID('mobile').setAttribute('onclick', 'openMenu()');
}
let user;

function showActiveUser() {
    if (localStorage.getItem('newUser') == null) {

    } else {
        user = localStorage.getItem('newUser');
        user = JSON.parse(user);
        getID('active-user').innerHTML = `${user['first-name'].charAt(0)}${user['last-name'].charAt(0)}`;
    }
}