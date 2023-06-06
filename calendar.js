const wrapperDays = document.querySelector(".days_items")
const detailsWrapper = document.querySelector(".details_event");

let title = document.querySelector("#set_task_title"),
    description = document.querySelector("#set_task_desc"),
    hFrom = document.querySelector("#hour_from"),
    hTo = document.querySelector("#hour_to");

document.querySelector("#set_user_event").addEventListener('click', setEvent)
document.querySelector(".remove_event").addEventListener('click', removeEvent)

let intervalHideCurrentDate;
let intervalShowCurrentDate;
let intervalHideDays;
let intervalShowDays;
let opc = 1;
let opacity = 1;

let userDay;
let userEvents = 0;

let date = new Date(); 
let actualDay;

const tabUserEvents = [] 

class userEvent {
    constructor(id, eventTitle, eventDesc, eventFrom, eventTo, allDay, eventDay, eventMonth, eventYear, display) {
        this.id = id;
        this.eventTitle = eventTitle;
        this.eventDesc = eventDesc;
        this.eventFrom = eventFrom;
        this.eventTo = eventTo;
        this.allDay = allDay;
        this.eventDay = eventDay;
        this.eventMonth = eventMonth;
        this.eventYear = eventYear;
        this.display = display
    }
}

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
        if(localStorageData[i].key.includes('userEvent'))
            userEvents++;
    }

    loadEvents();
    document.querySelector(".current_d").innerHTML = allMonths[date.getMonth()] + " " + date.getFullYear();
});


const loadEvents = () => {
    for(let i = 0; i<userEvents; i++) {
        const jsonString = localStorage.getItem(`userEvent${i}`);
        const myEvent = JSON.parse(jsonString);

        tabUserEvents.push(myEvent)
    }

    writeDays(); 
}

const writeDays = () => {

    for(let i=0; i<42; i++) 
    {
        let div = document.createElement("div");
        wrapperDays.appendChild(div);
        wrapperDays.lastChild.classList.add("day_item");
    }

    setDays();
}

const previousMonth = () => {

    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    document.querySelector("#previous_month").setAttribute("onclick",";");

    setTimeout(() => {
        document.querySelector("#previous_month").setAttribute("onclick","previousMonth()");
      }, "0500")


    updateCalendarAnimation();        
}

const nextMonth = () => {

    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    document.querySelector("#next_month").setAttribute("onclick",";");
    
    setTimeout(() => {
        document.querySelector("#next_month").setAttribute("onclick","nextMonth()");
      }, "0500")

    updateCalendarAnimation()
}

const updateCalendarAnimation = () => {

    intervalHideDays = setInterval(() => {
        opacity -= 0.1;
        if(opacity <= 0)
            clearInterval(intervalHideDays);
      
            document.querySelector(".days_items").style.opacity = opacity;

      }, 1000/120);

      setTimeout(() => {
                setDays();
                intervalShowDays = setInterval(() => {
                    opacity += 0.1;
                
                    if(opacity >= 1)
                        clearInterval(intervalShowDays);
            
                  document.querySelector(".days_items").style.opacity = opacity;
            
                }, 1000/120);
        
      }, "0150")
}

const setDays = () => {
   
    const   myDay       = document.querySelectorAll('.day_item');
    const   firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const   lastDay  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const   day      = firstDay.getDay() ? firstDay.getDay()-1 : 6;
    let dzien = 1;


    for (let i = 0; i < myDay.length; i++) {

            myDay[i].removeEventListener('click', addTaskWrapperOpen)
            myDay[i].removeEventListener('click', showDetails)
            myDay[i].classList.remove("ready")

            if(i>=day && dzien<=lastDay.getDate())
            {
                myDay[i].addEventListener('click', addTaskWrapperOpen)
                myDay[i].classList.add("ready")
                myDay[i].innerHTML = dzien;
                if(dzien==new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear())
                    myDay[i].innerHTML = '<span class="present_day">' + dzien + '</span>';

                if(isEventThen(myDay[i].innerText, date.getMonth(), date.getFullYear(), 0) == true)
                {
                    myDay[i].innerHTML += '<div class="kropeczka"></div>';
                    myDay[i].removeEventListener('click', addTaskWrapperOpen)
                    myDay[i].addEventListener('click', showDetails)
                }
               
                dzien++
                
            }
            else
                myDay[i].innerHTML = ""

            if (i>=35) 
                myDay[i].style.display =  (day+dzien-1<36) ?  'none' : '';      
                
        }
 
    intervalHideCurrentDate = setInterval(fadeOut, 1000/120) 
}

const fadeOut = () => {

    opc-=0.1;
    if(opc<=0)
    {
        document.querySelector(".current_d").style.opacity = 0;
        opc = 0;
        clearInterval(intervalHideCurrentDate);
        changeCurrentDate();
    }

    document.querySelector(".current_d").style.opacity = opc;
}

const changeCurrentDate = () => {
    document.querySelector(".current_d").innerHTML = allMonths[date.getMonth()] + " " + date.getFullYear();
    intervalShowCurrentDate = setInterval(fadeIn, 1000/120)
}

const fadeIn = () => {

    opc+=0.1;
    if(opc>=1)
    {
        document.querySelector(".current_d").style.opacity = 1;
        opc = 1;
        clearInterval(intervalShowCurrentDate);
    }

    document.querySelector(".current_d").style.opacity = opc;
    
}

const closeWrapperAddEvent = () => {

    document.querySelector(".add_task").style.display = "none";
    document.querySelector(".add_task").style.opacity = "0";

    title.value = "";
    description.value = "";
    hFrom.value = "";
    hTo.value = "";
    document.querySelector("#all_day_input").checked = false;
    document.querySelector(".from input").disabled = false;
    document.querySelector(".to input").disabled = false;
    document.querySelector(".hours").style.opacity = "1";
}

const closeWrapperDetailsEvent = () => {
    document.querySelector(".details_event").style.display = "none";
    document.querySelector(".details_event").style.opacity = "0";
}

const eventAllDay = () => {

    if(document.querySelector("#all_day_input").checked)
    {
        document.querySelector(".hours").style.opacity = "0.5";
        document.querySelector(".from input").disabled = "disabled";
        document.querySelector(".to input").disabled = "disabled";
    }
    else   
    {
        document.querySelector(".hours").style.opacity = "1";
        document.querySelector(".from input").disabled = false;
        document.querySelector(".to input").disabled = false;
    }
}

function addTaskWrapperOpen() {
    document.querySelector(".add_task").style.display = "block";
    document.querySelector(".add_task").style.opacity = "1";
    
    let syntax = this.innerText + " " + allMonths[date.getMonth()] + " " + date.getFullYear();

    userDay = this.innerText;

    document.querySelector("#event_date").innerHTML = syntax;
}

function setEvent() {

    let allDay;
    if(document.querySelector("#all_day_input").checked)
        allDay = true;
    else 
        allDay = false;

    tabUserEvents[userEvents] = new userEvent(userEvents, title.value, description.value, hFrom.value, hTo.value, allDay, userDay, date.getMonth(), date.getFullYear(), true);
    
    const eventToSave = {
       ...tabUserEvents[userEvents]
    };

    let jsonString = JSON.stringify(eventToSave)
    localStorage.setItem(`userEvent${userEvents}`, jsonString)

    userEvents++;

    setDays();
    closeWrapperAddEvent();
}

function showDetails() {
    
    let i = isEventThen(this.innerText, date.getMonth(), date.getFullYear(), 1)

    let dDate = document.querySelector(".d_event_date");
    let dTitle = document.querySelector(".d_event_title");
    let dDesc = document.querySelector(".d_event_desc");
    let dTime = document.querySelector(".d_event_time span");

    detailsWrapper.style.display = "block";
    detailsWrapper.style.opacity = "1";

    dDate.innerHTML = this.innerText + " " + allMonths[date.getMonth()] + " " + date.getFullYear();
    dTitle.innerHTML = tabUserEvents[i].eventTitle;
    dDesc.innerHTML = tabUserEvents[i].eventDesc;

    dTime.innerText = tabUserEvents[i].allDay ? 'All day' : tabUserEvents[i].eventFrom + " - " + tabUserEvents[i].eventTo;

    actualDay = this.innerText; 
}

function removeEvent() {

    let i = isEventThen(actualDay, date.getMonth(), date.getFullYear(), 1)

    const eventToRemove = {
        ...tabUserEvents[i],
        display: false
     };

    const jsonString = JSON.stringify(eventToRemove)
    localStorage.setItem(`userEvent${i}`, jsonString)

    location.reload();   
}

function isEventThen(dayy, monthh, yearr, option) {

    if(tabUserEvents.length <=0)
        return;

    let i = 0;

    do {
        if(tabUserEvents[i].eventDay == dayy && tabUserEvents[i].eventMonth == monthh && tabUserEvents[i].eventYear == yearr && tabUserEvents[i].display)
        {
            switch(option) {
                case 0: {
                    return true;
                }
                case 1: {
                    return i
                }
            }    
        }
        i++
        
    } while(i < tabUserEvents.length)

}  