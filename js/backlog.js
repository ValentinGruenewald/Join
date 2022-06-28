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
    currentUser = allUsers[0]['name'];
    renderusers();


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
    <div class="edit-task" id="content">
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


function renderusers(){
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
    tasks[i].place = 'open';
    updateBacklog();
    backlog();
    document.getElementById('change-task').classList.add('d-none');
}

async function updateBacklog() {
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
}





