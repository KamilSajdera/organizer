const pageTitle = document.querySelector(".title_dashboard");
const pageDescription = document.querySelector(".p_dashboard");
const myEvent = document.querySelector(".closest_event");
const myTasks = document.querySelector(".closest_tasks");
const dashboardItems = document.querySelectorAll('.dashboard-item')


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

const allMonths = [ 
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

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
        const currentDate = new Date();
       
        const jsonString = localStorage.getItem(`userEvent${i}`);
        const myEvent = JSON.parse(jsonString);

        const eventDate = new Date(myEvent.eventYear, myEvent.eventMonth, myEvent.eventDay)

        if(eventDate >= currentDate || isSameDay(eventDate, currentDate))
            tabUserEvents.push(myEvent)
        else {
            const modifiedEvent = {
                ...myEvent,
                display: false
            }
            tabUserEvents.push(modifiedEvent)
        }

        
    }

    for(let i = 0; i<targets; i++) {
        const jsonString = localStorage.getItem(`userTarget${i}`)
        const myTarget = JSON.parse(jsonString);

        userTargets.push(myTarget);
    }
}

function isSameDay(date1, date2) {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
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
    }, 150);

    
    setTimeout(() => {
        interval2 = setInterval(() => {
                if(opc2 >= 1)
                        clearInterval(interval2)  
                
                opc2+= 0.0099;      
                dashboardItems[0].style.opacity = opc2;
        }, 1);
    }, 750);

    setTimeout(() => {
       interval3 = setInterval(() => {
                if(opc3 >= 1)
                        clearInterval(interval3)  
                
                opc3+= 0.0099;      
                dashboardItems[1].style.opacity = opc3;
        }, 1);
    }, 1000);

    setTimeout(() => {
        interval4 = setInterval(() => {
                 if(opc4 >= 1)
                         clearInterval(interval4)  
                 
                 opc4+= 0.0099;      
                 dashboardItems[2].style.opacity = opc4;
         }, 1);
     }, 1250);

}

const dashboard = () => {

    let i = 0,
        z = 0;

    let budgetPercent = 0;


    if(events == 0)
        document.querySelectorAll('.dashboard-item')[0].innerHTML = '<h2>You have no events.  </h2>';
    
    if(targets == 0)
        document.querySelectorAll('.dashboard-item')[1].innerHTML = '<h2>No goals yet.</h2>';

    if(tasks == 0)
        document.querySelectorAll('.dashboard-item')[2].innerHTML = '<h2>No tasks yet. </h2>';


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

    dashboardItems[2].appendChild(document.createElement('ul'))
    while(z < 5 && z < tasks) {    
        const wrapperTasks = document.querySelector('.dashboard-item ul')
        if(userTasks[i].taskActive == 1) {
            let li = document.createElement('li');
            wrapperTasks.appendChild(li);

            li.innerHTML = `<p>${userTasks[i].taskTitle}</p>
                            <h5>${userTasks[i].taskDate}</h5>`

            if(userTasks[i].taskPriority == "High")
                wrapperTasks.lastChild.classList.add('shadow-red')
            else if(userTasks[i].taskPriority == "Mid")
                wrapperTasks.lastChild.classList.add('shadow-orange')
            else 
                wrapperTasks.lastChild.classList.add('shadow-green')

            z++;
        }
        
        i++;      
    }


    z = 0;
    i = 0;

   

    while(z < 4 && z < events) {
        
        if(tabUserEvents[i].display) {
                let div = document.createElement('div');
                dashboardItems[0].appendChild(div);
                dashboardItems[0].lastChild.classList.add("event-item")

                let liSyntax = `<p>${tabUserEvents[i].eventTitle}</p>
                                <h1>${tabUserEvents[i].eventDay}</h1>
                                <h3>${allMonths[tabUserEvents[i].eventMonth]}</h3>`
                div.innerHTML = liSyntax;
                z++; 
        }

        i++;
    }

    z = 0;
    i = 0;

    while(z < 3 && z < targets) {  

        if(userTargets[i].complete == 0) {
                budgetPercent = userTargets[i].currentDeposit/userTargets[i].amount * 100;
                let div = document.createElement('div');
                dashboardItems[1].appendChild(div);
                dashboardItems[1].lastChild.classList.add("budget-item")
    
                let liSyntax = `<h3 class="budget_title">${userTargets[i].targetName}</h3>
                <div class="graph_width">
                    <div class="graph_progress" style="width: ${Math.round(budgetPercent)}%;"></div>
                </div>
                <div class="graph_percent">${Math.round(budgetPercent)}%</div>`;
                div.innerHTML = liSyntax;
                z++;
        }
        i++                               
    }
           
} 
