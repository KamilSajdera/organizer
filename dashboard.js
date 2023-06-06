const pageTitle = document.querySelector(".title_dashboard");
const pageDescription = document.querySelector(".p_dashboard");
const myEvent = document.querySelector(".closest_event");
const myBudget = document.querySelector(".budget_container");
const myTasks = document.querySelector(".closest_tasks");


let taskId = 0,
    userEvents = 0,
    targetId = 0

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



const userTasks = [];
const tabUserEvents = [];
const userTargets = [];

window.addEventListener('load', (event) => {  

    const localStorageData = Object.keys(localStorage).map(key => ({ key, value: localStorage.getItem(key) }));

    for(let i = 0; i<localStorageData.length; i++) {
        if(localStorageData[i].key.includes('taskId'))
            tasks++;

        if(localStorageData[i].key.includes('userTarget'))
            targets++;

        if(localStorageData[i].key.includes('userEvent'))
            events++;  
    }

    showEffects();

    loadData();
    dashboard();
});

const loadData = () => {

    for(let i = 0; i<tasks; i++) {
        const jsonString = localStorage.getItem(`taskId${i}`);
        const myObject = JSON.parse(jsonString);

        userTasks.push(myObject)
    }

    for(let i = 0; i<events; i++) {
        const jsonString = localStorage.getItem(`userEvent${i}`);
        const myEvent = JSON.parse(jsonString);

        tabUserEvents.push(myEvent)
    }

    for(let i = 0; i<targets; i++) {
        const jsonString = localStorage.getItem(`userTarget${i}`)
        const myTarget = JSON.parse(jsonString);

        userTargets.push(myTarget);
    }
}

const showEffects = () => {
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

const dashboard = () => {
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

    if(targets == 0)
        document.querySelector('.budget_graph').innerHTML = '<h4>No goals yet. </h4>';
    
    if(events == 0)
        document.querySelector('.event_content').innerHTML = '<h4 style="color: #000; "> You have no events. </h4>';

    if(tasks == 0)
        document.querySelector('.tasks_wrapper').innerHTML = '<h4 style="padding: 10px 0;">No tasks yet. </h4>';


    tabUserEvents.sort((a, b) => {
        const dateA = new Date(a.eventYear, a.eventMonth, a.eventDay);
        const dateB = new Date(b.eventYear, b.eventMonth, b.eventDay);
    
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
        
    })

    while(z < 3 && z < tasks) {    
        if(userTasks[i].taskActive == 1) {
            let li = document.createElement('li');
            wrapperTasks.appendChild(li);

            li.innerHTML = `<div class="wrapper_t_title"> ${userTasks[i].taskTitle} </div> <div class="wrapper_t_date"> ${userTasks[i].taskDate}  </div>`;
            z++;
        }
        
        i++;      
    }


    z = 0;
    i = 0;
    while(z < 5 && z < events) {
        if(tabUserEvents[i].display) {
            let li = document.createElement('li');
            wrapperEvents.appendChild(li);

            let liSyntax = `${tabUserEvents[i].eventTitle} - <span style="color: rgb(54, 52, 52);"> 
                            ${tabUserEvents[i].eventDay < 10 ? '0' : ''}${tabUserEvents[i].eventDay}
                            / ${tabUserEvents[i].eventMonth+1 < 10 ? '0' : ''}${tabUserEvents[i].eventMonth+1}
                            / ${tabUserEvents[i].eventYear} 
                            </span>`
            li.innerHTML = liSyntax;
            z++; 
        }

        i++;
    }


    z = 0;
    i = 0;
    let budgetPercent;

    while(z < 4 && z < targets) {  
        if(userTargets[i].complete == 0) {
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
