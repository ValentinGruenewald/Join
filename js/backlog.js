
async function backlog(){

    let tasksAsJSON = await backend.getItem('tasksAsJSON');
    tasks = JSON.parse(tasksAsJSON);
    
    let test = document.getElementById('backlogs');
    test.innerHTML = ``;

     for(let i = 0; i < tasks.length; i++){

        test.innerHTML += `<div class="backlog  ${tasks[i]['assigned-to']}">
                               
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
    personalColor();
}

