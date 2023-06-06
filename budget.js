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

let targets = 0;
let userComplete = 0;


const userTargets = [];

class userTarget {
    constructor(targetName, currentDeposit, amount, complete) {
        this.targetName = targetName;
        this.currentDeposit = currentDeposit;
        this.amount = amount;
        this.complete = complete
    }
}

window.addEventListener('load', (event) => {  
    const localStorageData = Object.keys(localStorage).map(key => ({ key, value: localStorage.getItem(key) }));

    for(let i = 0; i<localStorageData.length; i++) {
        if(localStorageData[i].key.includes('userTarget'))
            targets++;
    }

    loadTargets();
});


const loadTargets = () => {

    for(let i = 0; i<targets; i++) {
        const jsonString = localStorage.getItem(`userTarget${i}`)
        const myTarget = JSON.parse(jsonString);

        userTargets.push(myTarget);
        createTarget(myTarget.targetName, myTarget.amount, myTarget.currentDeposit, i)
    }
}


function buttonNewTarget() {
    document.querySelector(".target_details").style.display = "block";
}

function closeNewTarget() {
    document.querySelector(".target_details").style.display = "none";
}


function addNewTarget() {

    let inputTargetName = document.getElementById("inputTargetName");
    let inputTargetCost = document.getElementById("inputTargetCost");
    let inputTargetAmount = document.getElementById("inputTargetAmount");


    if(inputTargetName.value.length < 6) {
        alert("At least 6 characters in title!");
        return;
    }

    if(parseInt(inputTargetCost.value) < 1) {
        alert("Cost must be greater than 1!");
        return;
    }

    if(parseInt(inputTargetAmount.value) > parseInt(inputTargetCost.value)) {
        alert("Your amount can't be greater than the cost!");
        return;
    }

    closeNewTarget();

    userTargets[targets] = new userTarget(inputTargetName.value, parseInt(inputTargetAmount.value), parseInt(inputTargetCost.value), userComplete);

    const jsonString = JSON.stringify(userTargets[targets])
    localStorage.setItem(`userTarget${targets}`, jsonString)

    createTarget(inputTargetName.value, inputTargetCost.value, inputTargetAmount.value, targets);
    
    inputTargetName.value = "";
    inputTargetCost.value = "";
    inputTargetAmount.value = "";
    targets++;
}

const createTarget = (name, cost, amount, i) => {    

    let progressValue = userTargets[i].currentDeposit/userTargets[i].amount * 100;
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

    if(userTargets[i].currentDeposit >= userTargets[i].amount) 
        budgetWrapper.lastChild.classList.add("done_target");

    let divSyntax =    `<div class="budget_bar"> ${name}
                        </div>
                        <div class="your_deposit">Your deposit: <span class="actual_deposit"> ${amount} $</span> </div>
                        <div class="total_cost">Total cost: ${cost} $</div>
                        <div class="progress_container">
                                <div class="progressBar" id="proId${i}">
                                    <div class="progress" style="width: ${progressValue}%; background: ${bgColor};"></div>
                                    <div class="progress_percent">${Math.floor(progressValue)}%</div>
                                </div>      
                        </div>
                        <div class="tooltip_deposit">
                            <input type="number">
                        </div>
                        <div class="manage_deposit"> 
                            <button class="add_deposit" onclick="modifyDeposit(${i}, 0)">
                                    +
                            </button>
                            <button class="diminish_deposit" onclick="modifyDeposit(${i}, 1)">
                                -
                            </button>
                        </div>`

    budgetWrapper.lastChild.innerHTML = divSyntax;
}


const modifyDeposit = (nr, option) => {
    
    actualDeposit = document.querySelectorAll(".actual_deposit");
    depositValue = document.querySelectorAll(".tooltip_deposit input");

    if(depositValue[nr].value < 1) {
        depositValue[nr].classList.add("wrong_deposit");
        return;
    }

    if(depositValue[nr].classList == "wrong_deposit")
        depositValue[nr].classList.remove("wrong_deposit");


    if(option == 0 ) {
        if((depositValue[nr].value) > (userTargets[nr].amount - userTargets[nr].currentDeposit)) {
            alert("This number is too large for this target.");
            return;
        }

        userTargets[nr].currentDeposit += parseInt(depositValue[nr].value);
    }

    else {
        if(depositValue[nr].value > userTargets[nr].currentDeposit) {
            alert("This number is too large for this target.");
            return;
        }

        userTargets[nr].currentDeposit -= parseInt(depositValue[nr].value);
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
        userTargets[nr].complete = 1;

    const jsonString = JSON.stringify(userTargets[nr])
    localStorage.setItem(`userTarget${nr}`, jsonString)
}


function manageDoneTargets() {

    let targetsDone = document.querySelectorAll(".done_target");

    for(let i = 0; i<targetsDone.length; i++) {
        if(buttonShowDone.checked)
            targetsDone[i].style.display = "none";
        else
            targetsDone[i].style.display = "block";
    }
}
