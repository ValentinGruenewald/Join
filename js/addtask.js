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
        'name': 'Marco Scherf',
        'selected': true
    },
    {
        'name': 'Valentin Olberding',
        'selected': false
    },
    {
        'name': 'Tom Petri',
        'selected': false
    },
    {
        'name': 'Valentin Grünewald',
        'selected': false
    }
]

users = [
    {
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
    clearUsers()
    
}



// This function is for testing purposes only
async function renderTasks() {

    let tasksAsJSON = await backend.getItem('tasksAsJSON');
    tasks = JSON.parse(tasksAsJSON);

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
function selectUser(user) {
    clearUsers()
    document.getElementById(`user_${user}`).classList.add('selected-user');
    currentUser = allUsers[user - 1]['name'];
}

function clearUsers() {
    for (let i = 1; i < allUsers.length + 1; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }
