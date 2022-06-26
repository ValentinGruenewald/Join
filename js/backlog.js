function backlog() {
    let test = document.getElementById('backlogs');
    test.innerHTML = ``;

    for (let i = 0; i < tasks.length; i++) {
        backlogExplaining(i);
        if (tasks[i].place == 'backlog') {
            test.innerHTML += `<div     onclick="openTask(${i})" class="backlog  ${tasks[i]['assigned-to']}">
                               
                                <div class="profile">
                                <div class="profile-picture">
                                </div>
                                <div>
                                    ${tasks[i]['assigned-to']}
                                    </div>
                                </div>
                                <div class="category">
                                    <b>${tasks[i]['category']}</b>
                                </div>
                                <div class="description">
                                    ${tasks[i]['description']}
                                </div>
                               
                            </div>`;
        }
    }
}

function backlogExplaining(i){
    let backlogInfo = document.getElementById('backlog-descripton');
    if(tasks[i].place == 'backlog'){
        backlogInfo.innerHTML = `<div class="headline-backlog"> <h1>Backlog</h2>
                                        The following tasks need to be planned into a sprint.</div>`;
    } else{
        backlogInfo.innerHTML = `<div class="headline-backlog"> <h1>Backlog</h2><div>You have to create a task first</div>`;
    }
}

function openTask(i) {
    document.getElementById('change-task').classList.remove('d-none')
    document.getElementById('change-task').innerHTML = generateTask(i);
    document.getElementById('title' + i).value = `${tasks[i]['title']}`
    document.getElementById('category' + i).value = `${tasks[i]['category']}`
    document.getElementById('description' + i).value = `${tasks[i]['description']}`
    document.getElementById('due-date' + i).value = `${tasks[i]['due-date']}`
    document.getElementById('urgency' + i).value = `${tasks[i]['urgency']}`
    document.getElementById('user_1').classList.add('selected-user');
    currentUser = allUsers[0]['name'];
    test();


}

function selectUser(user) {
    clearUsers()
    document.getElementById(`user_${user}`).classList.add('selected-user');
    currentUser = allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'];
}

function clearUsers() {
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }
}


function generateTask(i) {
    return /*html*/ `
    <div id="content">
    <div class="add-task">
        <form class="form" action="return: false">
            <div class="form-left">
                <p>TITLE</p>
                <input class="inputs" type="text" id="title${i}" required>
                <p>CATEGORY</p>
                <input class="inputs" type="text" id="category${i}" required>
                <p>DESCRIPTION</p>
                <input class="inputs" type="text" id="description${i}" required>
            </div>
            <div class="form-right">
                <p>DUE DATE</p>
                <input class="inputs" type="date" id="due-date${i}" required>
                <p>URGENCY</p>
                <select class="inputs choose" type="text" name="urgency${i}" id="urgency${i}">
                    <option value="Low">Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                </select>
                <p>ASSIGNED TO</p>
                <div id="users" class="users">
                    <div class="user-box">
                        <p>Marco</p>
                        <div id="user_1" class="user-img selected-user" onclick="selectUser(1)">M</div>
                    </div>
                    <div class="user-box">
                        <p>Valentin</p>
                        <div id="user_2" class="user-img" onclick="selectUser(2)">V</div>
                    </div>
                    <div class="user-box">
                        <p>Tom</p>
                        <div id="user_3" class="user-img" onclick="selectUser(3)">T</div>
                    </div>
                    <div class="user-box">
                        <p>Me</p>
                        <div id="user_4" class="user-img" onclick="selectUser(4)">M</div>
                    </div>
                </div>
                <div class="buttons">
                <button onclick="cancelTask()" class="cancel-button">CANCEL</button>
                <button onclick="pushToBoard(${i})" class="addToBoard-button">ADD TO BOARD</button>
                </div>
            </div>
        </form>
    </div>
    <div id="test-tasks-container">
    </div>
</div>
    `;
}

function cancelTask() {
    document.getElementById('change-task').classList.add('d-none')
}

function pushToBoard(i) {
    tasks[i].place = 'open';
    updateBacklog();
    backlog();
}

async function updateBacklog() {
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
}


function test() {
    if (allUsers == '') {
        allUsers = [{
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
        }];
    }

    document.getElementById('users').innerHTML = '';
    for (let i = 0; i < allUsers.length; i++) {

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
        </div>`;
    }
    document.getElementById('users').innerHTML += `
        <div class="user-box">
            <div class="user-img" id="open-add-user" onclick="openAddUser()">
                <img src="img/icon plus.png">
            </div>
        </div>
    `;

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
    if (checkIfNewUserIsValid() == true) {
        let newUser = newUserBlueprint();
        allUsers.push(newUser);
        let allUsersAsJSON = JSON.stringify(allUsers);
        await backend.setItem('allUsersAsJSON', allUsersAsJSON);
        test();
        closeAddUser();
        clearAddUser();
    } else {
        alert('Please enter your full name.');
    }
}

function newUserBlueprint() {
    return {
        'first-name': document.getElementById('new-user-first-name').value,
        'last-name': document.getElementById('new-user-last-name').value,
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

function openDeleteUserWindow(i) {
    closeAddUser();
    closeAllDeleteUserWindows();
    document.getElementById(`delete-user-window_${i}`).classList.remove('d-none');
}

function closeAllDeleteUserWindows() {
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById(`delete-user-window_${i}`).classList.add('d-none');
    }
}

async function deleteUser(user) {
    allUsers.splice(user, 1);
    let allUsersAsJSON = JSON.stringify(allUsers);
    await backend.setItem('allUsersAsJSON', allUsersAsJSON);
    test();
}