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
let userEvents = occurrences(document.cookie, "userEvent")

var date = new Date();
let actualDay = 0;

const tabUserEvents = new Array();

function userEvent(id, eventTitle, eventDesc, eventFrom, eventTo, allDay, eventDay, eventMonth, eventYear)
{
    this.id = id;
    this.eventTitle = eventTitle;
    this.eventDesc = eventDesc;
    this.eventFrom = eventFrom;
    this.eventTo = eventTo;
    this.allDay = allDay;
    this.eventDay = eventDay;
    this.eventMonth = eventMonth;
    this.eventYear = eventYear;
}

let allMonths = [
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
    loadEvents();
    document.querySelector(".current_d").innerHTML = allMonths[date.getMonth()] + " " + date.getFullYear();
});


function loadEvents()
{
    let cookieTitle,
        cookieDescription,
        cookieHFrom,
        cookieHTo,
        cookieAllDay,
        cookieUserDay,
        cookieMonth,
        cookieYear;

    for(var i=0; i < userEvents ; i++)
    {
        cookie = getCookie("userEvent"+i);
        
        cookieTitle = setWorld("eventTitle", "eventDesc" , 1)
        cookieDescription = setWorld("eventDesc", "eventFrom" , 2)
        cookieHFrom = setWorld("eventFrom", "eventTo" , 2)
        cookieHTo = setWorld("eventTo", "eventAll" , 5)
        cookieAllDay = setWorld("eventAll", "eventDay" , 3)
        cookieUserDay = setWorld("eventDay", "eventMonth" , 3)
        cookieMonth= setWorld("eventMonth", "eventYear" , 1)
        cookieYear = setWorld("eventYear", ";" , 4)

        tabUserEvents[i] = new userEvent(i, cookieTitle, cookieDescription, cookieHFrom, cookieHTo, cookieAllDay, cookieUserDay, cookieMonth, cookieYear);
    }

    writeDays(); 
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
            world = cookie.substring(index1+11, index2-2);
            break;
        }
        case 2:
        {
            world = cookie.substring(index1+10, index2-2);
            break;
        }
        case 3:
        {
            world = cookie.substring(index1+9, index2-2);
            break;
        }
        case 4:
        {
            world= cookie.substr(index1+10)
            break;
        }

        case 5:
        {
            world = cookie.substring(index1+8, index2-2);
            break;
        }

    }

    return world;
}

function writeDays()
{
    for(var i=0; i<42; i++)
    {
        let div = document.createElement("div");
        wrapperDays.appendChild(div);
        wrapperDays.lastChild.classList.add("day_item");
    }

    setDays();
}



function previousMonth () {
    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    document.querySelector("#previous_month").setAttribute("onclick",";");

    setTimeout(() => {
        document.querySelector("#previous_month").setAttribute("onclick","previousMonth()");
      }, "0500")


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


    
function nextMonth () {
    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    document.querySelector("#next_month").setAttribute("onclick",";");
    
    setTimeout(() => {
        document.querySelector("#next_month").setAttribute("onclick","nextMonth()");
      }, "0500")

    

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


function setDays() {
   
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

function fadeOut()
{
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

function changeCurrentDate()
{
    document.querySelector(".current_d").innerHTML = allMonths[date.getMonth()] + " " + date.getFullYear();
    intervalShowCurrentDate = setInterval(fadeIn, 1000/120)
}

function fadeIn()
{
    opc+=0.1;
    if(opc>=1)
    {
        document.querySelector(".current_d").style.opacity = 1;
        opc = 1;
        clearInterval(intervalShowCurrentDate);
    }

    document.querySelector(".current_d").style.opacity = opc;
    
}


function closeWrapperAddEvent()
{
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

function closeWrapperDetailsEvent()
{
    document.querySelector(".details_event").style.display = "none";
    document.querySelector(".details_event").style.opacity = "0";
}

function eventAllDay()
{
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

function addTaskWrapperOpen()
{
    document.querySelector(".add_task").style.display = "block";
    document.querySelector(".add_task").style.opacity = "1";
    
    let syntax = this.innerText + " " + allMonths[date.getMonth()] + " " + date.getFullYear();

    userDay = this.innerText;

    document.querySelector("#event_date").innerHTML = syntax;
}


function setEvent()
{

    let allDay;
    if(document.querySelector("#all_day_input").checked)
        allDay = 1;
    else 
        allDay = 0;

        

    tabUserEvents[userEvents] = new userEvent(userEvents, title.value, description.value, hFrom.value, hTo.value, allDay, userDay, date.getMonth(), date.getFullYear());
    let datee = new Date().getFullYear() + 4;
    
    document.cookie = 'userEvent'+userEvents+ '=' + userEvents + ', eventTitle=' + title.value + ', eventDesc='+ description.value + ', eventFrom='+ hFrom.value + ', eventTo='+ hTo.value + ', eventAll='+ allDay + ', eventDay=' + userDay + ', eventMonth=' + date.getMonth() + ', eventYear=' + date.getFullYear() + '; expires=Thu, 18 Dec '+ datee +' 12:00:00 UTC';
   
    userEvents++;

    setDays();
    closeWrapperAddEvent();

}

function showDetails()
{
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

    if(tabUserEvents[i].allDay == 1)
        dTime.innerText = "All day";
    else 
    dTime.innerText = tabUserEvents[i].eventFrom + " - " + tabUserEvents[i].eventTo;

    actualDay = this.innerText;
    
}


function removeEvent()
{
    let datee = new Date().getFullYear() + 4;
    let i = isEventThen(actualDay, date.getMonth(), date.getFullYear(), 1)
    document.cookie = 'userEvent'+i+ '=' + i + '; expires=Thu, 18 Dec '+ datee +' 12:00:00 UTC';
    location.reload();
    
}

function isEventThen(dayy, monthh, yearr, option)
{

    if(tabUserEvents.length <=0)
        return;

    var i = 0;

    do
    {
        
        if(tabUserEvents[i].eventDay == dayy && tabUserEvents[i].eventMonth == monthh && tabUserEvents[i].eventYear == yearr)
        {
            switch(option)
            {
                case 0:
                {
                    return true;
                }
                case 1:
                {
                    return i
                }

            }
           
        }
        i++
        
    } while(i < tabUserEvents.length)

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