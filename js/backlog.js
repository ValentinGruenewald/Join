let currentTask;

function backlog() {
    backlogExplaining();
    let backlog = document.getElementById('backlogs');
    backlog.innerHTML = ``;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].place == 'backlog') {
            backlog.innerHTML += tempaletBacklog(i);
            shortDescription(i);
        }
    }
}

function tempaletBacklog(i) {
    return `<div onclick="openTask(${i})" class="backlog ${tasks[i]['assigned-to']}">
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
            <div class="description" id="desc${i}">
            </div>`
}

let result;

function shortDescription(i) {
    let description = tasks[i].description;
    let count = 40;
    result = description.slice(0, count) + (description.length > count ? "..." : "");
    document.getElementById(`desc${i}`).innerHTML = result;
}

function backlogExplaining() {
    let backlogInfo = document.getElementById('backlog-descripton');
    if (tasks.length > 0) {
        backlogInfo.innerHTML = `<div class="headline-backlog"> <h1>Backlog</h1>
                                        <span>The following tasks need to be planned into a sprint.</span></div>`;
    } else {
        backlogInfo.innerHTML = `<div class="headline-backlog"> <h1>Backlog</h1><div><span>You have to create a task first.</span></div>`;
    }
}

function openTask(i) {
    currentTask = i;
    document.getElementById('change-task').classList.remove('d-none')
    document.getElementById('change-task').innerHTML = generateTask(i);
    document.getElementById('title' + i).value = `${tasks[i]['title']}`
    document.getElementById('category' + i).value = `${tasks[i]['category']}`
    document.getElementById('description' + i).value = `${tasks[i]['description']}`
    document.getElementById('due-date' + i).value = `${tasks[i]['due-date']}`
    document.getElementById('urgency' + i).value = `${tasks[i]['urgency']}`
    renderusers();
    selectedUser();
}

function selectedUser() {
    document.getElementById(`user_${tasks[currentTask]['user-id']}`).classList.add('selected-user');
}

function selectUser(user) {
    clearUsers()
    document.getElementById(`user_${user}`).classList.add('selected-user');
    currentUser = allUsers[user]['first-name'] + ' ' + allUsers[user]['last-name'];
    tasks[currentTask]['assigned-to'] = currentUser;
}

function clearUsers() {
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }
}


function generateTask(i) {
    return /*html*/ `
    <div class="edit-task" id="content">
    <div class="add-task">
        <form class="form" onsubmit="event.preventDefault(), pushToBoard(${i})">
            <div class="form-left">
                <p>TITLE</p>
                <input class="inputs" type="text" id="title${i}" required>
                <p>CATEGORY</p>
                <select type="text" name="category${i}" id="category${i}">
                <option value="Management">Management</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
            </select>
                <p>DESCRIPTION</p>
                <textarea class="inputs-decription" type="text" id="description${i}" required></textarea>
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
                </div>
                <div class="buttons">
                <button type="reset" onclick="cancelTask()" class="cancel-button">CANCEL</button>
                <button type="submit" class="addToBoard-button">ADD TO BOARD</button>
                </div>
            </div>
        </form>
    </div>
    <div id="test-tasks-container">
    </div>
</div>
    `;

}


function renderusers() {
    for (let i = 0; i < allUsers.length; i++) {
        document.getElementById('users').innerHTML += `
    <div id="user_${i}" class="user-img" onclick="selectUser(${i})">${allUsers[i]['first-name'].charAt(0) + allUsers[i]['last-name'].charAt(0)}</div>
    `
    }
}

function cancelTask() {
    document.getElementById('change-task').classList.add('d-none')
}

function pushToBoard(i) {
    tasks[i].title = document.getElementById(`title${i}`).value;
    tasks[i].category = document.getElementById(`category${i}`).value;
    tasks[i].description = document.getElementById(`description${i}`).value;
    tasks[i]['due-date'] = document.getElementById(`due-date${i}`).value;
    tasks[i].urgency = document.getElementById(`urgency${i}`).value;
    tasks[i].place = 'todo';
    updateBacklog();
    backlog();
    document.getElementById('change-task').classList.add('d-none');
    showPopup();
}

async function updateBacklog() {
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
}