tasks = [
    {
        'title': 'Title1',
        'category': 'Category1',
        'description': 'This is Task 1',
        'due-date': '2022-06-10',
        'urgency': 'High',
        'assigned-to': 'Marco'
    }
]

users = [
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
        'assigned-to': `${currentUser}`
    };
    tasks.push(newTask);
    clearForm();
    renderTasks();
    return false;
}

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
    </div>
    `;
    }
    return false;
}

function clearForm() {
    document.getElementById('title').value = ''
    document.getElementById('category').value = ''
    document.getElementById('description').value = ''
    document.getElementById('due-date').value = ''
    document.getElementById('urgency').value = 'Low'
}


function selectUser(user) {
    for (let i = 1; i = users.length; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }

    document.getElementById(`user_${user}`).classList.add('selected-user');
}