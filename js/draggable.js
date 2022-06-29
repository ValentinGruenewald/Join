let todos = [
    {
        'id': 0,
        'title': 'Spazieren',
        'categorie': 'open',
    },

    {
        'id': 1,
        'title': 'Schlafen',
        'categorie': 'closed',
    },
];


let = currentDraggedElement;


function updateHTML() {
    let open = todos.filter(t => t['categorie'] == 'open')
    let number = 0;
    document.getElementById(`open`).innerHTML = ``;

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        document.getElementById(`open`).innerHTML += `
               <div draggable="true" ondragstart="startDragging(${element['id']})" class="toDoBox">${element['title']}</div>
           `;
    }


    let closed = todos.filter(t => t['categorie'] == 'closed')

    document.getElementById(`closed`).innerHTML = ``;

    for (let i = 0; i < closed.length; i++) {
        const element = closed[i];
        document.getElementById(`closed`).innerHTML += `
               <div draggable ="true"; ondragstart="startDragging(${element['id']})" class="toDoBox">${element['title']}</div>
           `;
    }
}


function moveTo(categorie) {
    todos[currentDraggedElement]['categorie'] = categorie;
    updateHTML();
}


function startDragging(id) {
    currentDraggedElement = id;
}


// Allow Dragging //
function allowDrop(ev) {
    ev.preventDefault();
}


function highlight(id) {
    document.getElementById(id).classList.add('highlight');
}


function removeHighlight() {
    document.getElementById(id).classList.remove('highlight');
}
