let budgetItem = document.querySelectorAll(".budget_item");
let actual_deposit;
let depositValue;

const budgetAddButton = document.querySelector(".budget_add");
const budgetCloseWrapper = document.querySelector(".close_target_details");
const budgetWrapper = document.querySelector(".budget_items");
const buttonSetTarget = document.getElementById("set_target");
const buttonShowDone = document.getElementById("hideDoneButton");

budgetAddButton.addEventListener('click', buttonNewTarget)
budgetCloseWrapper.addEventListener('click', closeNewTarget)
buttonSetTarget.addEventListener('click', addNewTarget);
buttonShowDone.addEventListener('click', manageDoneTargets);



let targetId = occurrences(document.cookie, "targetId");
let cookie;
let target = 0;
let userComplete = 0;


const userTargets = new Array();
 
function userTarget(targetName, currentDeposit, amount, complete)
{
    this.targetName = targetName;
    this.currentDeposit = currentDeposit;
    this.amount = amount;
    this.complete = complete
}

window.addEventListener('load', (event) => {  
    loadTargets();
});


function loadTargets()
{

    let cookieTarget,
        cookieCost,
        cookieAmount;


        for(let i=0; i < targetId; i++)
        {
            cookie = getCookie(`targetId${i}`);
            

            cookieTarget = setWorld("targetTitle", "targetCost" , 1)
            cookieCost = setWorld("targetCost", "targetAmount" , 2)
            cookieAmount = setWorld("targetAmount", "targetActive" , 3)
            
           
            
            if(cookie.includes("targetActive = 1"))
            {
                userComplete = 0;
            }
            else 
                userComplete = 1;

           
            userTargets[i] = new userTarget(cookieTarget, parseInt(cookieAmount), parseInt(cookieCost), userComplete);
            createTarget(cookieTarget, cookieCost, cookieAmount, i)
           
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
            world = cookie.substring(index1+12, index2-2);
            break;
        }
        case 2:
        {
            world = cookie.substring(index1+11, index2-2);
            break;
        }
        case 3:
        {
            world = cookie.substring(index1+13, index2-2);
            break;
        }

    }

    return world;
}

function buttonNewTarget()
{
    document.querySelector(".target_details").style.display = "block";
}

function closeNewTarget()
{
    document.querySelector(".target_details").style.display = "none";
}

function addNewTarget()
{

    let inputTargetName = document.getElementById("inputTargetName");
    let inputTargetCost = document.getElementById("inputTargetCost");
    let inputTargetAmount = document.getElementById("inputTargetAmount");


    /*if(inputTargetName.value.length < 6)
    {
        alert("At least 6 characters in title!");
        return;
    }

    if(parseInt(inputTargetCost.value) < 1)
    {
        alert("Cost must be greater than 1!");
        return;
    }

    if(parseInt(inputTargetAmount.value) > parseInt(inputTargetCost.value))
    {
        alert("Your amount can't be greater than the cost!");
        return;
    }*/

    closeNewTarget();

    let date = new Date().getFullYear() + 4;

    userTargets[target] = new userTarget(inputTargetName.value, parseInt(inputTargetAmount.value), parseInt(inputTargetCost.value), userComplete);
    document.cookie = 'targetId'+target + '=' + target + ', targetTitle=' + inputTargetName.value + ', targetCost='+ inputTargetCost.value + ', targetAmount='+ inputTargetAmount.value + ', targetActive = 1; expires=Thu, 18 Dec '+ date +' 12:00:00 UTC';
    
    createTarget(inputTargetName.value, inputTargetCost.value, inputTargetAmount.value, target);
    
    inputTargetName.value = "";
    inputTargetCost.value = "";
    inputTargetAmount.value = "";
}

function createTarget(name, cost, amount, i)
{    

    let progressValue = userTargets[target].currentDeposit/userTargets[target].amount * 100;
    let bgColor;

    if(progressValue <= 20)
        bgColor = "linear-gradient(90deg, #fd0a0a, #ad5959)";
    else if(progressValue >= 21 && progressValue <= 49)
        bgColor = "linear-gradient(90deg, #56482c, #e79d17)";
    else if(progressValue >= 50 && progressValue <= 79)
        bgColor = "linear-gradient(90deg, #586600, #cfe410)";
    else 
        bgColor = "linear-gradient(90deg, #054e05, #1fda1f)";
    
    
    budgetWrapper.appendChild(document.createElement('div'));
    budgetWrapper.lastChild.classList.add("budget_item");

    if(userTargets[target].currentDeposit >= userTargets[target].amount)
    {
        budgetWrapper.lastChild.classList.add("done_target");
    }

    let divSyntax =    `<div class="budget_bar"> ${name}
                        </div>
                        <div class="your_deposit">Your deposit: <span class="actual_deposit"> ${amount} $</span> </div>
                        <div class="total_cost">Total cost: ${cost} $</div>
                        <div class="progress_container">
                                <div class="progressBar" id="proId${target}">
                                    <div class="progress" style="width: ${progressValue}%; background: ${bgColor};"></div>
                                    <div class="progress_percent">${Math.floor(progressValue)}%</div>
                                </div>
                                
                        </div>

                        <div class="tooltip_deposit">
                            <input type="number">
                        </div>


                        <div class="manage_deposit"> 
                            <button class="add_deposit" onclick="modifyDeposit(${target}, 0)">
                                    +
                            </button>

                            <button class="diminish_deposit" onclick="modifyDeposit(${target}, 1)">
                                -
                            </button>
                        </div>`

    budgetWrapper.lastChild.innerHTML = divSyntax;
    target++;
}


function modifyDeposit(nr, option)
{
    
    actualDeposit = document.querySelectorAll(".actual_deposit");
    depositValue = document.querySelectorAll(".tooltip_deposit input");
    let date = new Date().getFullYear() + 4;

    if(depositValue[nr].value < 1)
    {
        depositValue[nr].classList.add("wrong_deposit");
        return;
    }

    if(depositValue[nr].classList == "wrong_deposit")
        depositValue[nr].classList.remove("wrong_deposit");


    if(option == 0 )
    {
        if((depositValue[nr].value) > (userTargets[nr].amount - userTargets[nr].currentDeposit))
        {
            alert("This number is too large for this target.");
            return;
        }

        
        userTargets[nr].currentDeposit += parseInt(depositValue[nr].value);
        document.cookie = 'targetId'+nr + '=' + nr + ', targetTitle=' +  userTargets[nr].targetName + ', targetCost='+ userTargets[nr].amount + ', targetAmount='+ userTargets[nr].currentDeposit + ', targetActive = 1; expires=Thu, 18 Dec '+ date +' 12:00:00 UTC';
    }
    else 
    {
        if(depositValue[nr].value > userTargets[nr].currentDeposit)
        {
            alert("This number is too large for this target.");
            return;
        }

        userTargets[nr].currentDeposit -= parseInt(depositValue[nr].value);
        document.cookie = 'targetId'+nr + '=' + nr + ', targetTitle=' +  userTargets[nr].targetName + ', targetCost='+ userTargets[nr].amount + ', targetAmount='+ userTargets[nr].currentDeposit + ', targetActive = 1; expires=Thu, 18 Dec '+ date +' 12:00:00 UTC';
    }

    let progressValue = userTargets[nr].currentDeposit/userTargets[nr].amount * 100;
    let bgColor;

    if(progressValue <= 20)
        bgColor = "linear-gradient(90deg, #fd0a0a, #ad5959)";
    else if(progressValue >= 21 && progressValue <= 49)
        bgColor = "linear-gradient(90deg, #56482c, #e79d17)";
    else if(progressValue >= 50 && progressValue <= 79)
        bgColor = "linear-gradient(90deg, #586600, #cfe410)";
    else 
        bgColor = "linear-gradient(90deg, #054e05, #1fda1f)";

    document.querySelector(`#proId${nr} .progress`).style.width = progressValue + "%";
    document.querySelector(`#proId${nr} .progress`).style.background = bgColor;
    document.querySelector(`#proId${nr} .progress_percent`).innerHTML = Math.floor(progressValue) + "%"

    actualDeposit[nr].innerHTML = `${userTargets[nr].currentDeposit} $`;

    if(userTargets[nr].currentDeposit >= userTargets[nr].amount)
    {
        userTargets[nr].complete = 1;
        document.cookie = 'targetId'+nr + '=' + nr + ', targetTitle=' +  userTargets[nr].targetName + ', targetCost='+ userTargets[nr].amount + ', targetAmount='+ userTargets[nr].currentDeposit + ', targetActive = 0; expires=Thu, 18 Dec '+ date +' 12:00:00 UTC';
    }
}



function manageDoneTargets()
{

    let targetsDone = document.querySelectorAll(".done_target");

    for(let i = 0; i<targetsDone.length; i++)
    {
        if(buttonShowDone.checked)
            targetsDone[i].style.display = "none";
        else
            targetsDone[i].style.display = "block";
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