function getID(id) {
    return document.getElementById(id);
}

function openMenu() {
    getID('nav').classList.add('show');
    getID('mobile-img').src = 'img/close.png';
    getID('content').classList.add('d-none');
    getID('mobile').setAttribute('onclick', 'closeMenu()');
}

function closeMenu() {
    getID('nav').classList.remove('show');
    getID('mobile-img').src = 'img/menu.png';
    getID('content').classList.remove('d-none');
    getID('mobile').setAttribute('onclick', 'openMenu()');
}