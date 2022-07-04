let userIsAssignedToAnyTask = false;
let userBelongsToDefaultUsers = false;
let userAlreadyExists = false;

async function addTask() {
    let newTask = {
        'id': new Date().getTime(),
        'title': `${document.getElementById('title').value}`,
        'category': `${document.getElementById('category').value}`,
        'description': `${document.getElementById('description').value}`,
        'due-date': `${document.getElementById('due-date').value}`,
        'urgency': `${document.getElementById('urgency').value}`,
        'assigned-to': `${currentUser}`,
        'user-id': `${currentUserId}`,
        'place': `backlog`
    };
    tasks.push(newTask);
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
    clearForm();
}


function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('category').value = 'Management';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('urgency').value = 'Low';
    renderUsers();
}


function selectUser(user) {
    clearUsers()
    document.getElementById(`user_${user}`).classList.add('selected-user');
    currentUser = allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'];
    currentUserId = allUsers[user]['user-id'];
}


function clearUsers() {
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }
}


function renderUsers() {
    if (allUsers == '') {
        resetAllUsers();
    }
    document.getElementById('users').innerHTML = '';
    for (let i = 0; i < allUsers.length; i++) {
        renderOneUser(i);
    }
    renderAddUserButton();
    document.getElementById('user_0').classList.add('selected-user');
}


function openAddUser() {
    closeAllDeleteUserWindows();
    document.getElementById('open-add-user').classList.add('d-none');
    setTimeout(function () {
        document.getElementById('open-add-user').classList.remove('d-none');
    }, 0);
    document.getElementById('add-user').classList.remove('d-none');
}


function closeAddUser() {
    document.getElementById('add-user').classList.add('d-none');
    clearAddUser();
}


async function addUser() {
    checkifUserAlreadyExists();
    if (userAlreadyExists == true) {
        alert('You cannot add a user that already exists.');
    } else {
        if (checkIfNewUserIsValid() == true) {
            let newUser = newUserBlueprint();
            allUsers.push(newUser);
            let allUsersAsJSON = JSON.stringify(allUsers);
            await backend.setItem('allUsersAsJSON', allUsersAsJSON);
            renderUsers();
            closeAddUser();
            clearAddUser();
        } else {
            alert('Please enter your full name.');
        }
    }
}


function newUserBlueprint() {
    return {
        'first-name': document.getElementById('new-user-first-name').value,
        'last-name': document.getElementById('new-user-last-name').value,
        'user-id': allUsers.length,
        'selected': false
    };
}


function checkIfNewUserIsValid() {
    if (document.getElementById('new-user-first-name').value == '') {
        return false;
    } else {
        if (document.getElementById('new-user-last-name').value == '') {
            return false;
        } else {
            return true;
        }
    }
}


function clearAddUser() {
    document.getElementById('new-user-first-name').value = '';
    document.getElementById('new-user-last-name').value = '';
}


function openDeleteUserWindow(user) {
    closeAddUser();
    closeAllDeleteUserWindows();
    document.getElementById(`delete-user-window_${user}`).classList.remove('d-none');
}


function closeAllDeleteUserWindows() {
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById(`delete-user-window_${i}`).classList.add('d-none');
    }
}


async function deleteUser(user) {
    checkIfUserBelongsToDefaultUsers(user);
    if (userBelongsToDefaultUsers == true) {
        alert('You cannot delete this user because it is one of the default users.');
    } else {
        checkIfUserIsAssignedToAnyTask(user);
        if (userIsAssignedToAnyTask == true) {
            alert('You cannot delete this user because it is currently assigned to a task.');
            closeAllDeleteUserWindows();
        } else {
            allUsers.splice(user, 1);
            let allUsersAsJSON = JSON.stringify(allUsers);
            await backend.setItem('allUsersAsJSON', allUsersAsJSON);
            correctUserIds();
            currentUserId = 0;
            currentUser = allUsers[0]['first-name'] + ' ' + allUsers[0]['last-name'];
            renderUsers();
            fixAssignationOfTasksAfterDeletingAUser(user);
        }
    }
}


function renderOneUser(i) {
    document.getElementById('users').innerHTML += `
        <div class="user-box">
        <img id="delete-user_${i}" class="delete-user" onclick="openDeleteUserWindow(${i})" src="img/close.png">
        <div id="delete-user-window_${i}" class="delete-user-window d-none">
            Are you sure you want to remove the user ${allUsers[i]['first-name']} ${allUsers[i]['last-name']}?
            <div>
                <button type="button" onclick="deleteUser(${i})">Remove</button>
                <button class="cancel-button" type="button" onclick="closeAllDeleteUserWindows()">Cancel</button>
            </div>
        </div>
        <div id="user_${i}" class="user-img" onclick="selectUser(${i})">${allUsers[i]['first-name'].charAt(0) + allUsers[i]['last-name'].charAt(0)}</div>
        </div>
        `;
}


function renderAddUserButton() {
    document.getElementById('users').innerHTML += `
    <div class="user-box">
        <div class="user-img" id="open-add-user" onclick="openAddUser()">
            <img src="img/icon plus.png">
        </div>
    </div>
    `;
}

function checkifUserAlreadyExists() {
    userAlreadyExists = false;
    let currentNewName = document.getElementById('new-user-first-name').value + ' ' + document.getElementById('new-user-last-name').value;
    for (let i = 0; i < allUsers.length; i++) {
        let alreadyExistingName = allUsers[i]['first-name'] + ' ' + allUsers[i]['last-name'];
        if (currentNewName == alreadyExistingName) {
            userAlreadyExists = true;
        }
    }
}

function checkIfUserBelongsToDefaultUsers(user) {
    if (allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'] == 'Marco Scherf' || allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'] == 'Valentin Olberding' || allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'] == 'Tom Petri' || allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'] == 'Valentin Grünewald') {
        userBelongsToDefaultUsers = true;
    }
}


function checkIfUserIsAssignedToAnyTask(user) {
    userIsAssignedToAnyTask = false;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['assigned-to'] == allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name']) {
            userIsAssignedToAnyTask = true;
        } else { }
    }
}

function correctUserIds() {
    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i]['user-id'] = i;
    }
}


function resetAllUsers() {
    allUsers = [{
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
}


async function fixAssignationOfTasksAfterDeletingAUser(user) {
    for (let i = user; i < allUsers.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j]['user-id'] == `${user+1}`) {
                tasks[j]['user-id'] = `${tasks[j]['user-id']-1}`;
            }
        }
    }
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
}