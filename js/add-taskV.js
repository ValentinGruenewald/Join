tasks = [
    {
        'title': 'Title1',
        'category': 'Category1',
        'description': 'This is Task 1',
        'due-date': '2022-06-10',
        'urgency': 'High',
        'assigned-to': 'Marco',
        'place': `backlog`
    }
]

allUsers = [
    {
        'name': 'Marco',
        'selected': true
    },
    {
        'name': 'Valentin',
        'selected': false
    },
    {
        'name': 'Tom',
        'selected': false
    },
    {
        'name': 'Me',
        'selected': false
    }
]

currentUser = 'Marco';

function addTask() {
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
    backend.setItem(tasksAsJSON);
    clearForm();
    renderTasks();
}

function clearForm() {
    document.getElementById('title').value = ''
    document.getElementById('category').value = ''
    document.getElementById('description').value = ''
    document.getElementById('due-date').value = ''
    document.getElementById('urgency').value = 'Low'
    clearUsers()
    document.getElementById('user_1').classList.add('selected-user');
    currentUser = allUsers[0]['name'];
}


function selectUser(user) {
    clearUsers()
    document.getElementById(`user_${user}`).classList.add('selected-user');
    currentUser = allUsers[user - 1]['name'];
}

function clearUsers() {
    for (let i = 1; i < allUsers.length + 1; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }
}

// This function is for testing purposes only
function renderTasks() {

    document.getElementById('test-tasks-container').innerHTML = ``;
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('test-tasks-container').innerHTML += `
    <div class="task">
    ${tasks[i]['title']}
    ${tasks[i]['category']}
    ${tasks[i]['description']}
    ${tasks[i]['due-date']}
    ${tasks[i]['urgency']}
    ${tasks[i]['assigned-to']}
    ${tasks[i]['place']}
    </div>
    `;
    }
}