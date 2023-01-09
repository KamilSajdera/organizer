
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

let interval1;
let interval2;
let opacityStart = 0;
let cookie;

let taskId = occurrences(document.cookie, "taskId")
const userTasks = new Array();
 
function userTask(id, taskTitle, taskDesc, taskDate, taskPriority, taskActive)
{
    this.taskId = id;
    this.taskTitle = taskTitle;
    this.taskDesc = taskDesc;
    this.taskDate = taskDate;
    this.taskPriority = taskPriority;
    this.taskActive = taskActive;
}

window.addEventListener('load', (event) => {  
        loadTasks();
  });


function loadTasks()
{
    let cookieTitle,
        cookieDescription,
        cookieDate, 
        cookiePrio,
        cookieActive;


    for(let i=0; i < taskId ; i++)
    {
        cookie = getCookie(`taskId${i}`);
        
        cookieTitle = setWorld("taskTitle", "taskDesc" , 1)
        cookieDescription = setWorld("taskDesc", "taskDate" , 2)
        cookieDate = setWorld("taskDate", "taskPrio" , 3)
        cookiePrio = setWorld("taskPrio", "taskActive" , 4)

       
        if(cookie.includes("taskActive = 1"))
            cookieActive = 1;
        else 
            cookieActive = 0;

        userTasks[i] = new userTask(i, cookieTitle, cookieDescription, cookieDate, cookiePrio, cookieActive);
        showDT(i);
    }
}


function showDT(i)
{
    
    if(userTasks[i].taskActive == 0)
        return;

    let li = document.createElement('li');
    userTasksWrapper.appendChild(li);

    let liSyntax = `<div class="item_icon"> <i class="fa fa-superpowers" aria-hidden="true"></i></div>
                    <div class="item_desc"><h3> ${userTasks[i].taskTitle} </h3><p>Priority: <b> ${userTasks[i].taskPriority} </b> | Until when: <span class="pokemon"> ${userTasks[i].taskDate} </span></p></div>
                    <div class="item_settings"> <i class="fa fa-question-circle" aria-hidden="true" id="show_details" onclick="showDetails(${i})"><span class="tooltiptext" style="background-color: #22c6bf;">Show details</span></i><i class="fa fa-trash" aria-hidden="true" id="remove_task" onclick="removeTask(this,${i})"><span class="tooltiptext" style="background-color: #d11e1e;">Remove task</span></i></div>`
    
    li.innerHTML = liSyntax;
    userTasksWrapper.lastChild.classList.add("item_task");

    if(userTasks[i].taskPriority=="High")
        userTasksWrapper.lastChild.classList.add("border_high");
    else if(userTasks[i].taskPriority=="Mid")
        userTasksWrapper.lastChild.classList.add("border_mid");
    else 
        userTasksWrapper.lastChild.classList.add("border_low");
}


function setWorld(x, y, z)
{
    let index1, index2;
    let world;
   
    index1 = cookie.indexOf(x);
    index2 = cookie.indexOf(y);

    switch(z)
    {
        case 1: 
        {
            world = cookie.substring(index1+10, index2-2);
            break;
        }
        case 2:
        {
            world = cookie.substring(index1+9, index2-2);
            break;
        }
        case 3:
        {
            world = cookie.substring(index1+9, index2-2);
            break;
        }
        case 4:
        {
            world = cookie.substring(index1+9, index2-2);
            break;
        }

    }

    return world;
}
 

function showAddTaskWrapper()
{
    interval1 = setInterval(animationShowTask, 1000/60);
}

function animationShowTask()
{
    opacityStart+=0.1;

    if(opacityStart>=1)
    {
        clearInterval(interval1)
        opacityStart = 0;
    }
    else 
    {
        document.querySelector(".add_task").style.opacity = opacityStart;
        document.querySelector(".add_task").style.display = "block";  
    }
        
}

function hideTaskWrapper()
{
    document.querySelector(".add_task").style.display = "none"; 
    document.querySelector(".add_task").style.opacity = 0;
}

function hideDetailsWrapper()
{
    document.querySelector(".task_details").style.display = "none"; 
    document.querySelector(".task_details").style.opacity = 0;
}

function setTask()
{
    if(taskTitle.value.length < 10 )
        alert("Min 10 characters in the title!");
    else if(taskDate.value == "")
        alert("Complete the date!");
    else if(taskPriority.value == "Select")
        alert("Complete the priority!");
    else
    {
        userTasks[taskId] = new userTask(taskId, taskTitle.value, taskDesc.value, taskDate.value, taskPriority.value);
        document.querySelector(".add_task").style.display = "none"; 
        document.querySelector(".add_task").style.opacity = 0;

        userTasks[taskId].taskActive = 1;
        showDT(taskId);


        let date = new Date().getFullYear() + 4;
    
        document.cookie = 'taskId'+taskId + '=' + taskId + ', taskTitle=' + taskTitle.value + ', taskDesc='+ taskDesc.value + ', taskDate='+ taskDate.value + ', taskPrio='+ taskPriority.value + ', taskActive = 1; expires=Thu, 18 Dec '+ date +' 12:00:00 UTC';
        taskTitle.value = "";
        taskDesc.value = "";
        taskDate.value = "";
        taskPriority.value = "Select";
        taskId++;
    }
}

function removeTask(e,nr)
{ 
    let date = new Date().getFullYear() + 4;
    document.cookie = 'taskId' + nr + '='+nr+', taskTitle=' + userTasks[nr].taskTitle + ', taskDesc='+ userTasks[nr].taskDesc + ', taskDate='+ userTasks[nr].taskDate + ', taskPrio='+ userTasks[nr].taskPriority + ', taskActive = 0;  expires=Thu, 18 Dec '+ date +' 12:00:00 UTC;';
    userTasks[nr].taskActive = 0;
    return e.parentNode.parentNode.remove();
}

function showDetails(e)
{
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


function sortItems()
{
    const sDefault = document.querySelector("#sort_default");
    const sPriority = document.querySelector("#sort_priority");
    const sDate = document.querySelector("#sort_date");
    var i = 0;
    var j = 0;
    var k = 0;
    
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
            showDT(z);
    }

    else if(sPriority.checked)
    {
        sPriority.disabled=true;
        sDate.disabled=false;
        sDefault.disabled=false;

        while(i < userTasks.length)
        {
            if(userTasks[i].taskPriority == "High")
                showDT(i)
            i++
        }


        while(j < userTasks.length)
        {  
            if(userTasks[j].taskPriority == "Mid")
                showDT(j)  
            j++
        }

        while(k < userTasks.length)
        {
            if(userTasks[k].taskPriority == "Low")
                showDT(k)
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
                showDT(z);

    }
   
}



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}