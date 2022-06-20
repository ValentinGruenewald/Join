tasks = [{
    'title': 'Title1',
    'category': 'Category1',
    'description': 'This is Task 1',
    'due-date': '2022-06-10',
    'urgency': 'High',
    'assigned-to': 'Marco',
    'place': `backlog`
}]

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
}
]

users = [{
    'username': 'valentingruenewald',
    'password': 'test123'
},
{
    'username': 'valentingruenewald2',
    'password': 'test2'
}
]

currentUser = 'Marco';

async function addTask() {
    let newTask = {
        'title': `${document.getElementById('title').value}`,
        'category': `${document.getElementById('category').value}`,
        'description': `${document.getElementById('description').value}`,
        'due-date': `${document.getElementById('due-date').value}`,
        'urgency': `${document.getElementById('urgency').value}`,
        'assigned-to': `${currentUser}`,
        'place': `backlog`
    };
    tasks.push(newTask);
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
    clearForm();
}

function clearForm() {
    document.getElementById('title').value = ''
    document.getElementById('category').value = ''
    document.getElementById('description').value = ''
    document.getElementById('due-date').value = ''
    document.getElementById('urgency').value = 'Low'
    renderUsers();
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

function renderUsers() {
    console.log(allUsers);

    document.getElementById('users').innerHTML = '';
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById('users').innerHTML += `
        <div class="user-box">
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

function addUser() {
    if (checkIfNewUserIsValid() == true) {
        let newUser = {
            'first-name': document.getElementById('new-user-first-name').value,
            'last-name': document.getElementById('new-user-last-name').value,
            'selected': false
        };
        allUsers.push(newUser);
        renderUsers();
        closeAddUser();
        clearAddUser();
    } else {
        alert('Please enter your full name.');
    }
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