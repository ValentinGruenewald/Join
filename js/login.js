let activUser;
let userToLocalStorage;
let users = [{
        'username': 'scherf',
        'password': 'm.scherf'
    },
    {
        'username': 'olberding',
        'password': 'v.olberding'
    },
    {
        'username': 'petri',
        'password': 't.petri'
    },
    {
        'username': 'gruenewald',
        'password': 'v.gruenewald'
    }
];


function getID(id) {
    return document.getElementById(id);
}

function loadUsers() {
    userToLocalStorage = allUsers;
}

function showLoginPassword() {
    let password = getID("password");
    if (password.type === "password") {
        password.type = "text";
        getID('eye').src = 'img/notshow.png'
    } else {
        password.type = "password";
        getID('eye').src = 'img/eye.png'
    }
}

function showRegPassword() {
    let password = getID("reg-password");
    if (password.type === "password") {
        password.type = "text";
        getID('reg-eye').src = 'img/notshow.png'
    } else {
        password.type = "password";
        getID('reg-eye').src = 'img/eye.png'
    }
}

function elementUsers() {
    let user1 = users[0].username == getID('username').value && users[0].password == getID('password').value;
    let user2 = users[1].username == getID('username').value && users[1].password == getID('password').value;
    let user3 = users[2].username == getID('username').value && users[2].password == getID('password').value;
    let user4 = users[3].username == getID('username').value && users[3].password == getID('password').value;
    checkUser(user1, user2, user3, user4);
}

function checkUser(user1, user2, user3, user4) {
    switch (true) {
        case user1:
            activUserToLocalStorage(userToLocalStorage[0]);
            window.location = 'addtask.html';
            break;
        case user2:
            activUserToLocalStorage(userToLocalStorage[1]);
            window.location = 'addtask.html';
            break;
        case user3:
            activUserToLocalStorage(userToLocalStorage[2]);
            window.location = 'addtask.html';
            break;
        case user4:
            activUserToLocalStorage(userToLocalStorage[3]);
            window.location = 'addtask.html';
            break;
        default:
            alert('Bitte einloggen oder Regestrieren')
            break;
    }
}

function showRegister() {
    getID('reg-container').classList.remove('d-none');
}

function userLocalStorage() {
    userToLocalStorage = {
        'first-name': getID('reg-firstname').value,
        'last-name': getID('reg-lastname').value
    };
}
async function regUser() {
    let newUser = templateNewUser();
    allUsers.push(newUser);
    let allUsersAsJSON = JSON.stringify(allUsers);
    await backend.setItem('allUsersAsJSON', allUsersAsJSON);
    userLocalStorage();
    activUserToLocalStorage(userToLocalStorage);
    window.location = 'addtask.html';
}

function templateNewUser() {
    return {
        'first-name': document.getElementById('reg-firstname').value,
        'last-name': document.getElementById('reg-lastname').value,
        'selected': false
    };
}

function activUserToLocalStorage(user) {
    localStorage.setItem('newUser', JSON.stringify(user));
}

function clearLocalStorage() {
    window.location = 'addtask.html';
    localStorage.clear('newUser');

}