setURL('https://valentin-gruenewald.developerakademie.net/smallest_backend_ever');

let tasks = [];

let allUsers = [{
        'first-name': 'Marco',
        'last-name': 'Scherf',
        'selected': true
    },
    {
        'first-name': 'Valentin',
        'last-name': 'Olberding',
        'selected': false
    },
    {
        'first-name': 'Tom',
        'last-name': 'Petri',
        'selected': false
    },
    {
        'first-name': 'Valentin',
        'last-name': 'Grünewald',
        'selected': false
    }
];


let currentUser = 'Marco Scherf';

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
        loadUsers()
    }

}