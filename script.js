const buttonAddTask = document.querySelector(".add_new_task");
const buttonCloseTask = document.querySelector("#close_task_wrapper");
const buttonSetTask = document.querySelector("#button_set_task");
const userTasksWrapper = document.querySelector(".user_tasks");

const taskTitle = document.getElementById("set_task_title");
const taskDesc = document.getElementById("set_task_desc");
const taskDate = document.getElementById("task_date");
const taskPriority = document.getElementById("priority_select");

buttonAddTask.addEventListener('click', showAddTaskWrapper);
buttonCloseTask.addEventListener('click', hideTaskWrapper);
buttonSetTask.addEventListener('click', setTask);

let interval1, interval2;
let opacityStart = 0;

const userTasks = []; 
let taskId = 0;
 
class userTask {
    constructor(id, taskTitle, taskDesc, taskDate, taskPriority, taskActive) {
      this.taskId = id;
      this.taskTitle = taskTitle;
      this.taskDesc = taskDesc;
      this.taskDate = taskDate;
      this.taskPriority = taskPriority;
      this.taskActive = taskActive;
    }
}

window.addEventListener('load', (event) => {  
    const localStorageData = Object.keys(localStorage).map(key => ({ key, value: localStorage.getItem(key) }));

    for(let i = 0; i<localStorageData.length; i++) {
        if(localStorageData[i].key.includes('taskId'))
            taskId++;
    }

    loadTasks();
});


const loadTasks = () => {
    
    for(let i = 0; i<taskId; i++) {
        const jsonString = localStorage.getItem(`taskId${i}`);
        const myObject = JSON.parse(jsonString);

        userTasks.push(myObject)
        toDoList(i);
    }

}

const toDoList = item => {

    if(!userTasks[item].taskActive)
        return;

    let li = document.createElement('li');
    userTasksWrapper.appendChild(li);

    let liSyntax = `<div class="item_icon"> <i class="fa fa-superpowers" aria-hidden="true"></i></div>
                    <div class="item_desc"><h3> ${userTasks[item].taskTitle} </h3><p>Priority: <b> ${userTasks[item].taskPriority} </b> | Until when: <span class="pokemon"> ${userTasks[item].taskDate} </span></p></div>
                    <div class="item_settings"> <i class="fa fa-question-circle" aria-hidden="true" id="show_details" onclick="showDetails(${item})"><span class="tooltiptext" style="background-color: #22c6bf;">Show details</span></i><i class="fa fa-trash" aria-hidden="true" id="remove_task" onclick="removeTask(this,${item})"><span class="tooltiptext" style="background-color: #d11e1e;">Remove task</span></i></div>`
    
    li.innerHTML = liSyntax;
    userTasksWrapper.lastChild.classList.add('item_task', `border_${userTasks[item].taskPriority.toLowerCase()}`);
}

function showAddTaskWrapper() {
    interval1 = setInterval(animationShowTask, 1000/60);
}

const animationShowTask = () => {

    opacityStart+=0.1;

    if(opacityStart>=1) {
        clearInterval(interval1)
        opacityStart = 0;
    }
    else {
        document.querySelector(".add_task").style.opacity = opacityStart;
        document.querySelector(".add_task").style.display = "block";  
    }
        
}

function hideTaskWrapper() {
    document.querySelector(".add_task").style.display = "none"; 
    document.querySelector(".add_task").style.opacity = 0;
}

function hideDetailsWrapper() {
    document.querySelector(".task_details").style.display = "none"; 
    document.querySelector(".task_details").style.opacity = 0;
}

function setTask() {

    if(taskTitle.value.length < 10 )
        alert("Min 10 characters in the title!");

    else if(taskDate.value == "")
        alert("Complete the date!");

    else if(taskPriority.value == "Select")
        alert("Complete the priority!");

    else {
        userTasks[taskId] = new userTask(taskId, taskTitle.value, taskDesc.value, taskDate.value, taskPriority.value, true);
        document.querySelector(".add_task").style.display = "none"; 
        document.querySelector(".add_task").style.opacity = 0;

        toDoList(taskId);
    
        const jsonString = JSON.stringify(userTasks[taskId]);
        localStorage.setItem(`taskId${taskId}`, jsonString);
        
        taskTitle.value = "";
        taskDesc.value = "";
        taskDate.value = "";
        taskPriority.value = "Select";
        taskId++;
    }
}

const removeTask = (e, nr) => { 

    const taskToRemove = { 
        ...userTasks[nr],
        taskActive: false
    };

    const jsonString = JSON.stringify(taskToRemove);
    localStorage.setItem(`taskId${nr}`, jsonString)

    return e.parentNode.parentNode.remove();
}

const showDetails = e => {

    let detailsWrapper = document.querySelector(".task_details");

    detailsWrapper.style.display = "block";
    detailsWrapper.style.opacity = "1";

    let detailsSyntax = `<div class="add_task_wrapper det_task_wrapper"><button id="close_details_wrapper"><i class="fa fa-times" aria-hidden="true"></i></button>
                        <div class="det_task_title"><h1>${userTasks[e].taskTitle}</h1></div>
                        <div class="det_task_desc">${userTasks[e].taskDesc}</div>
                        <div class="det_task_date">Date: ${userTasks[e].taskDate}</div>
                        <div class="det_task_priority">Priority: ${userTasks[e].taskPriority}</div></div>`

    detailsWrapper.innerHTML = detailsSyntax;

    let buttonCloseDetails = document.querySelector("#close_details_wrapper");
    buttonCloseDetails.addEventListener('click', hideDetailsWrapper);
}

function sortItems() {

    const sDefault = document.querySelector("#sort_default");
    const sPriority = document.querySelector("#sort_priority");
    const sDate = document.querySelector("#sort_date");

    let i = 0,
        j = 0,
        k = 0;
    
    userTasksWrapper.innerHTML = "";

    if(sDefault.checked)
    {
        sDefault.disabled=true;
        sPriority.disabled=false;
        sDate.disabled=false;

        userTasks.sort((a, b) => {
            return a.taskId - b.taskId 
         })
        
        for(var z = 0; z < userTasks.length; z++)
            toDoList(z);
    }

    else if(sPriority.checked)
    {
        sPriority.disabled=true;
        sDate.disabled=false;
        sDefault.disabled=false;

        while(i < userTasks.length)
        {
            if(userTasks[i].taskPriority == "High")
                toDoList(i)
            i++
        }

        while(j < userTasks.length)
        {  
            if(userTasks[j].taskPriority == "Mid")
                toDoList(j)  
            j++
        }

        while(k < userTasks.length)
        {
            if(userTasks[k].taskPriority == "Low")
                toDoList(k)
            k++
        }
    }

    else 
    {
        sDate.disabled = true;
        sDefault.disabled = false;
        sPriority.disabled = false;

        userTasks.sort((a, b) => {
            const dateA = new Date(a.taskDate);
            const dateB = new Date(b.taskDate);
          
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
            
          })

        for(var z = 0; z < userTasks.length; z++)
            toDoList(z);

    }
   
}
