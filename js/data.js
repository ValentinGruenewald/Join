setURL('https://valentin-gruenewald.developerakademie.net/smallest_backend_ever');

let tasks = [];

let allUsers = [{
        'first-name': 'Marco',
        'last-name': 'Scherf',
        'user-id': 0,
        'selected': true
    },
    {
        'first-name': 'Valentin',
        'last-name': 'Olberding',
        'user-id': 1,
        'selected': false
    },
    {
        'first-name': 'Tom',
        'last-name': 'Petri',
        'user-id': 2,
        'selected': false
    },
    {
        'first-name': 'Valentin',
        'last-name': 'Grünewald',
        'user-id': 3,
        'selected': false
    }
];


let currentUser = 'Marco Scherf';
let currentUserId = 0;

async function init() {

    

    await downloadFromServer();
    let tasksAsJSON = await backend.getItem('tasksAsJSON');
    tasks = JSON.parse(tasksAsJSON);
    let allUsersAsJSON = await backend.getItem('allUsersAsJSON');
    allUsers = JSON.parse(allUsersAsJSON);
    if (typeof renderUsers == 'function') {
        renderUsers();
    }
    if (typeof showActiveUser == 'function') {
        showActiveUser();
    }
    if (typeof backlog == 'function') {
        backlog();
    }
    if (typeof loadUsers == 'function') {
        loadUsers();
    }
    if (typeof renderTask == 'function') {
        updateHTML();
    }

}
