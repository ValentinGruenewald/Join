let currentDraggedElement;

function getID(id) {
    return document.getElementById(id);
}

function updateHTML() {
    let boardIsFilled = false;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.place == 'backlog') {} else {
            boardIsFilled = true;
        }
    }
    if (boardIsFilled == false) {
        getID('empty-container').classList.remove('d-none');
        clearColums();
    } else {
        clearColums();
        filterTasks();
    }
}

function filterTasks() {
    let todo = tasks.filter(x => x['place'] == 'todo');
    renderTask(todo);
    let inprogress = tasks.filter(x => x['place'] == 'inprogress');
    renderTask(inprogress);
    let testing = tasks.filter(x => x['place'] == 'testing');
    renderTask(testing);
    let done = tasks.filter(x => x['place'] == 'done');
    renderTask(done);
}

function clearColums() {
    getID('todo').innerHTML = '';
    getID('inprogress').innerHTML = '';
    getID('testing').innerHTML = '';
    getID('done').innerHTML = '';
}

function renderTask(task) {
    for (let i = 0; i < task.length; i++) {
        const element = task[i];
        getID(`${element['place']}`).innerHTML += templateTasks(element, i);
        checkUrgency(element, i);
        checkCategory(element, i);
    }
}

function templateTasks(task, i) {
    return ` 
        <div class="board-task" id="${task['place']}${i}"  draggable="true" ondragstart="startDragging(${task['id']})" ontouchmove="moveTo('inprogress')" ondragend="removeHover()">
            <div class="cursor" onclick="showTask(${task.id})">
                <div class="board-category flex-end">${task.category}</div>
                <div class="board-title">${task.title}</div>
                <div class="board-description">${task.description}</div>
                <div class="board-member flex-end">${task['assigned-to']}</div>
            </div>
            <div class="board-footer">
                <div class="board-date">${formateDate(task['due-date'])}</div>
                <div class="hover cursor">
                <img onclick="deleteTask(${task['id']})" src="img/basket.png">
                </div>
            </div>
            <div class="hover move cursor"><img src="img/finish.png" onclick="nextSection(${task['id']}, '${task['place']}')"></div>
        </div>

    `;
}

function showTask(id) {
    let task = tasks.findIndex(obj => obj.id == id);
    getID('big-task').innerHTML = templateBigTask(task);
    getID('big-task-container').classList.remove('d-none');
    getID('big-task-container').style.top = `${window.scrollY}px`;
}

function templateBigTask(i) {
    return `
    <div class="close"><img src="img/task-close1.png" onclick="closeTask()"></div>
    <div class="big-task">
        <div class="board-category flex-end">${tasks[i].category}</div>
        <div class="board-title">${tasks[i].title}</div>
        <div class="board-description big-descriotion" id="board">${tasks[i].description}</div>
        <div class="board-member flex-end">${tasks[i]['assigned-to']}</div>
        <div class="board-footer">
            <div class="board-date">${formateDate(tasks[i]['due-date'])}</div>
            <div class="hover cursor">
                <img onclick="deleteTaskBig(${tasks[i]['id']})" src="img/basket.png">
            </div>
        </div>
    </div>
    `;
}


function checkUrgency(task, i) {
    switch (task['urgency']) {
        case 'High':
            getID(`${task['place']}${i}`).style.borderLeft = '4px solid red';
            break;
        case 'Middle':
            getID(`${task['place']}${i}`).style.borderLeft = '4px solid orange';
            break;
        case 'Low':
            getID(`${task['place']}${i}`).style.borderLeft = '4px solid yellow';
            break;
    }
}

function checkCategory(task, i) {
    switch (task['category']) {
        case 'Design':
            getID(`${task['place']}${i}`).style.backgroundColor = '#CDF0EA';
            break;
        case 'Management':
            getID(`${task['place']}${i}`).style.backgroundColor = '#FFE6E6';
            break;
        case 'Sales':
            getID(`${task['place']}${i}`).style.backgroundColor = '#FFE3A9';
            break;
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function moveTo(categorie) {
    let task = tasks.find(t => t.id == currentDraggedElement);
    task['place'] = categorie;
    save();
}

async function save() {
    let tasksAsJSON = JSON.stringify(tasks);
    await backend.setItem('tasksAsJSON', tasksAsJSON);
    updateHTML();
}

function addhover(id) {
    getID(id).classList.add('highlight');
}

function removeHover() {
    getID('todo').classList.remove('highlight');
    getID('inprogress').classList.remove('highlight');
    getID('testing').classList.remove('highlight');
    getID('done').classList.remove('highlight');
}

async function deleteTask(id) {
    let card = tasks.findIndex(obj => obj.id == id);
    tasks.splice(card, 1);
    await backend.setItem('tasksAsJSON', JSON.stringify(tasks));
    init();
    showPopup();
}
async function deleteTaskBig(id) {
    getID('big-task-container').classList.add('d-none');
    let card = tasks.findIndex(obj => obj.id == id);
    tasks.splice(card, 1);
    await backend.setItem('tasksAsJSON', JSON.stringify(tasks));
    init();
    showPopup();
}

function formateDate(dateStr) {
    let dArr = dateStr.split("-");
    return dArr[2] + "." + dArr[1] + "." + dArr[0];
}


function nextSection(id, place) {
    let taskPosition = tasks.findIndex(obj => obj.id == id);
    switch (place) {
        case 'todo':
            tasks[taskPosition].place = 'inprogress';
            break;
        case 'inprogress':
            tasks[taskPosition].place = 'testing';
            break;
        case 'testing':
            tasks[taskPosition].place = 'done';
            break;
        case 'done':
            tasks[taskPosition].place = 'todo';
            break;
    }
    save()
}

function closeTask() {
    getID('big-task-container').classList.add('d-none');
}