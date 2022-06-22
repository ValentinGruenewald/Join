

async function backlog(){

    let tasksAsJSON = await backend.getItem('tasksAsJSON');
    tasks = JSON.parse(tasksAsJSON);
    
    let test = document.getElementById('backlogs');
    test.innerHTML = ``;

     for(let i = 0; i < tasks.length; i++){
        if(tasks[i].place == 'backlog'){
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

function openTask(i){
    document.getElementById('change-task').classList.remove('d-none')
    document.getElementById('change-task').innerHTML = generateTask(i); 
    document.getElementById('title' + i).value = `${tasks[i]['title']}`
    document.getElementById('category' + i).value = `${tasks[i]['category']}`
    document.getElementById('description' + i).value = `${tasks[i]['description']}`
    document.getElementById('due-date' + i).value = `${tasks[i]['due-date']}`
    document.getElementById('urgency' + i).value = `${tasks[i]['urgency']}`
    document.getElementById('user_1').classList.add('selected-user');
    currentUser = allUsers[0]['name'];

   
}

function selectUser(user) {
    clearUsers();
    document.getElementById(`user_${user}`).classList.add('selected-user');
    currentUser = allUsers[user - 1]['name'];
}

function clearUsers() {
    for (let i = 1; i < allUsers.length + 1; i++) {
        document.getElementById(`user_${i}`).classList.remove('selected-user');
    }
}


function generateTask(i){
    return /*html*/ `
    <div id="content">
    <div class="add-task">
        <form class="form">
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
                <div class="users">
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
    `;}

function cancelTask(){
    document.getElementById('change-task').classList.add('d-none')
}

function pushToBoard(i){
        tasks[i].place = 'open'; 
        updateBacklog();
        backlog();
}

async function updateBacklog(){
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
}