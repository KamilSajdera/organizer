const pageTitle = document.querySelector(".title_dashboard");
const pageDescription = document.querySelector(".p_dashboard");
const myEvent = document.querySelector(".closest_event");
const myBudget = document.querySelector(".budget_container");
const myTasks = document.querySelector(".closest_tasks");


let taskId = occurrences(document.cookie, "taskId")
let userEvents = occurrences(document.cookie, "userEvent")
let targetId = occurrences(document.cookie, "targetId");

let events = 0;
let tasks = 0;
let targets = 0;

let interval,
    interval2,
    interval3,
    interval4;

let trans = -90,
    trans2 = 120,
    trans3 = -165;

let opc = 0,
    opc2 = 0,
    opc3 = 0,
    opc4 = 0;



const userTasks = new Array();

function userTask(id, taskTitle, taskDate, taskActive)
{
    this.taskId = id;
    this.taskTitle = taskTitle;
    this.taskDate = taskDate;
    this.taskActive = taskActive;
}



const tabUserEvents = new Array();

function userEvent(id, eventTitle, eventDay, eventMonth, eventYear)
{
    this.id = id;
    this.eventTitle = eventTitle;
    this.eventDay = eventDay;
    this.eventMonth = eventMonth;
    this.eventYear = eventYear;
}

const userTargets = new Array();
 
function userTarget(targetName, currentDeposit, amount, complete)
{
    this.targetName = targetName;
    this.currentDeposit = currentDeposit;
    this.amount = amount;
    this.complete = complete
}


window.addEventListener('load', (event) => {  

    showEffects();

    loadTasks();
    loadEvents();
    loadTargets();
    dashboard();
});


function showEffects()
{
            setTimeout(() => {
                interval = setInterval(() => {
                        if(trans++ == 0)
                            clearInterval(interval)

                        opc+= 0.0099;
                        pageTitle.style.transform = "translateY(" + trans + "px)";
                        pageTitle.style.opacity = opc;
                        pageDescription.style.opacity = opc;

                }, 1);
            }, 0150);


            setTimeout(() => {
                interval2 = setInterval(() => {
                        if(trans2-- == 0)
                                clearInterval(interval2)  
                        
                        opc2+= 0.0099;
                        myEvent.style.transform = "translateX(" + trans2 + "px)";        
                        myEvent.style.opacity = opc2;
                }, 1);
            }, 0850);


            setTimeout(() => {
                interval3 = setInterval(() => {
                        if(trans3++ == 0)
                                clearInterval(interval3)  
                        
                        opc3+= 0.0099;
                        myBudget.style.transform = "translateX(" + trans3 + "px)";        
                        myBudget.style.opacity = opc3;
                }, 1);
            }, 0450);


            setTimeout(() => {
                interval4 = setInterval(() => {
                        opc4+= 0.01;
                        if(opc4 >= 1)
                                clearInterval(interval4)  
                
                        myTasks.style.opacity = opc4;
                }, 1);
            }, 1100);

}


function loadTasks()
{
   
        let cookieTitle;
        let cookieDate;

                for(var i=0; i < taskId ; i++)
                {
                        cookie = getCookie(`taskId${i}`);
                        
                        cookieTitle = setWorld("taskTitle", "taskDesc" , 1)
                        cookieDate = setWorld("taskDate", "taskPrio" , 3)

                
                        if(cookie.includes("taskActive = 1"))
                        {
                            userTasks[i] = new userTask(i, cookieTitle, cookieDate, 1);
                            tasks++;
                        }
                        else 
                            return;

                       
                }

        if(tasks <= 0)
        {
            document.querySelector(".print_tasks").innerHTML = "You have no tasks...";
            document.querySelector(".print_tasks").style.padding = "30px 20px";
            document.querySelector(".print_tasks").style.fontStyle = "italic";
        }

}

function loadEvents()
{

    let cookieTitle;
    let cookieUserDay;
    let cookieMonth;
    let cookieYear;

        for(var i=0; i < userEvents ; i++)
        {
            cookie = getCookie(`userEvent${i}`);

            if(!cookie.includes("eventTitle"))
                continue;
            
            cookieTitle = setWorld("eventTitle", "eventDesc" , 5)
            cookieUserDay = setWorld("eventDay", "eventMonth" , 2)
            cookieMonth= setWorld("eventMonth", "eventYear" , 5)
            cookieYear = setWorld("eventYear", ";" , 6)

            tabUserEvents[i] = new userEvent(i, cookieTitle, cookieUserDay, cookieMonth, cookieYear);
            events++;
        }


        if(events <= 0)
        {
            document.querySelector(".print_events").innerHTML = "You have no events...";
            document.querySelector(".print_events").style.padding = "30px 20px";
            document.querySelector(".print_events").style.fontStyle = "italic";
            document.querySelector(".print_events").style.fontSize = "20px";
        }

}


function loadTargets()
{

    let cookieTarget,
    cookieCost,
    cookieAmount;

    for(let i=0; i < targetId; i++)
    {
        cookie = getCookie(`targetId${i}`);
        

        cookieTarget = setWorld("targetTitle", "targetCost" , 7)
        cookieCost = setWorld("targetCost", "targetAmount" , 5)
        cookieAmount = setWorld("targetAmount", "targetActive" , 8)
        
       
        
        if(cookie.includes("targetActive = 1"))
        {
            userTargets[i] = new userTarget(cookieTarget, parseInt(cookieAmount), parseInt(cookieCost), 0);
            targets++;
        }
        else 
            userTargets[i] = new userTarget(cookieTarget, parseInt(cookieAmount), parseInt(cookieCost), 1);
    }


    if(targets <= 0)
    {
        document.querySelector(".budget_graph").innerHTML = "You have no targets...";
        document.querySelector(".budget_graph").style.display = "block";
        document.querySelector(".budget_graph").style.fontStyle = "italic";
        document.querySelector(".budget_graph").style.fontSize = "20px";
        document.querySelector(".budget_graph").style.paddingTop = "30px";
    }

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
                    case 5: 
                    {
                        world = cookie.substring(index1+11, index2-2);
                        break;
                    }
                    case 6:
                    {
                        world= cookie.substr(index1+10)
                        break;
                    }
                    case 7: 
                    {
                        world = cookie.substring(index1+12, index2-2);
                        break;
                    }
                    case 8: 
                    {
                        world = cookie.substring(index1+13, index2-2);
                        break;
                    }

            }

            return world;
}


function dashboard()
{
                        const wrapperTasks = document.querySelector(".print_tasks"),
                                wrapperEvents = document.querySelector(".print_events"),
                                wrapperTargets = document.querySelector(".budget_graph ul");

                        let i = 0,
                            z = 0;

                        userTasks.sort((a, b) => {
                        const dateA = new Date(a.taskDate);
                        const dateB = new Date(b.taskDate);
                
                        if (dateA < dateB) return -1;
                        if (dateA > dateB) return 1;
                        return 0;
                        
                        })


                        tabUserEvents.sort((a, b) => {
                            const dateA = new Date(a.eventYear, a.eventMonth, a.eventDay);
                            const dateB = new Date(b.eventYear, b.eventMonth, b.eventDay);
                          
                            if (dateA < dateB) return -1;
                            if (dateA > dateB) return 1;
                            return 0;
                            
                          })


                        while(z < 3 && z < tasks)
                        {
                                
                                if(userTasks[i].taskActive == 1)
                                {
                                    let li = document.createElement('li');
                                    wrapperTasks.appendChild(li);
                    
                                    li.innerHTML = `<div class="wrapper_t_title"> ${userTasks[i].taskTitle} </div> <div class="wrapper_t_date"> ${userTasks[i].taskDate}  </div>`;
                                    z++;
                                }
                                
                                i++;
                                
                        }


                        z = 0;
                        while(z < 5 && z < events)
                        {
                                
                                let li = document.createElement('li');
                                wrapperEvents.appendChild(li);
                    
                                let liSyntax = `${tabUserEvents[z].eventTitle} - <span style="color: rgb(54, 52, 52);"> ${tabUserEvents[z].eventDay}/${tabUserEvents[z].eventMonth+1}/${tabUserEvents[z].eventYear} </span>`
                                li.innerHTML = liSyntax;
                                z++;
                               
                        }


                        z = 0;
                        i = 0;
                        let budgetPercent;

                        while(z < 4 && z < targets)
                        {
                                
                                if(userTargets[i].complete == 0)
                                {
                                        budgetPercent = userTargets[i].currentDeposit/userTargets[i].amount * 100;
                                        let li = document.createElement('li');
                                        wrapperTargets.appendChild(li);
                            
                                        let liSyntax = `<div class="graph_title">
                                                            ${userTargets[i].targetName} - ${Math.floor(budgetPercent)}% 
                                                        </div>
                                                        <div class="graph_width">
                                                            <div class="graph_progress" style="width: ${Math.floor(budgetPercent)}%;"></div>
                                                        </div>`;
                                        li.innerHTML = liSyntax;
                                        z++;
                                }

                                i++                               
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
    return "none";
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
