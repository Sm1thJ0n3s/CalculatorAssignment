let problemDisplay = document.getElementById("outputs");
let buttons = document.querySelectorAll("button"); // Grabs all buttons with the id name of "button"

var clearClicked = 0;
var deleteTime = 0; // Starting timer
var endTime = 0; // Ending timer
var timer = new Date(); // A timer for the delete function

function clickedHandler (event) {
    var buttonRep = event.target.innerText
    // When a button is pressed, buttonRep will fall under either of the if statements.
        if (!isNaN(buttonRep) || buttonRep === "+" || buttonRep === "-" || buttonRep === "*" || buttonRep === "/" || buttonRep === "."){
            addToScreen(buttonRep);
        } else if (buttonRep === "="){
            combiningAll()
        } else {
            if (deleteTime===0){
                deleteTime++;
            }
            clearingDelete()
        }
    
}

//Obtains the value of the button and adds it to the problemDisplay element
function addToScreen (buttonNum) {
    // 24 characters is the max
    if (problemDisplay.innerText.length < 24){
        problemDisplay.innerText += buttonNum;
    }
}

// Activates when the user clicks on the equal sign
function combiningAll (){
    let equation = problemDisplay.innerText;
    console.log(equation);
    // Grabs the operator index only
    let opIndex = -1
    let operator = "";
    if (equation.includes("+")){
        opIndex = equation.indexOf("+");
        operator = equation.slice(opIndex, opIndex+1);
    } else if (equation.includes("-")){
        opIndex = equation.indexOf("-");
        operator = equation.slice(opIndex, opIndex+1);
    } else if (equation.includes("*")){
        opIndex = equation.indexOf("*");
        operator = equation.slice(opIndex, opIndex+1);
    } else if (equation.includes("/")){
        opIndex = equation.indexOf("/");
        operator = equation.slice(opIndex, opIndex+1);
    }
    // Grabs the left of the operator and right of the operator in the equation inputted by the user
    let left = equation.slice(0, opIndex);
    let right = equation.slice(opIndex+1);
    // Checks if the left or right is a decimal or not
    if(problemDisplay.innerText.includes(".")){
        if (left.includes(".")){
        left = parseFloat(left);
        }
        if (right.includes(".")){
        right = parseFloat(right);
        }
    } else {
        left = parseInt(left);
        right = parseInt(right);
    }
    // Checks the operator's sign
    let answer = 0;
    if (operator.includes("*")){
        answer = left * right;
    } else if (operator.includes("/")){
        answer = left / right;
    } else if (operator.includes("+")){
        answer=left + right;
        console.log(answer);
    } else if (operator.includes("-")){
        answer = left - right;
    }
    
    // Checks if the answer is either a number, a decimal, or appears as an error (not a number or decimal)
    if (isNaN(answer)){
        if (problemDisplay.includes(".")) {
            if (answer === 0){

            } else {
                problemDisplay.innerText = answer;
            }
        } else {
            problemDisplay.innerText = "ERROR";
        }
    } else {
        if (answer === 0){

        } else {
            problemDisplay.innerText = answer;
        }
    }
    
    console.log("Hellooooo");
}

// When the C button is clicked once, this function will activate
function clearingDelete () {
    // Starts the deleting timer
    if (deleteTime !== 0){
        console.log("Before: " + problemDisplay)
        endTime = timer.getTime();
        console.log(endTime)
    }
    if (endTime !== 0){
        let removedElement = problemDisplay.innerText
        // If the C button is clicked again before the time ends for deleting, the entire equation is erased.
        if ((endTime - deleteTime) < (1.0 * 1000)){
            problemDisplay.innerText = ""
        } else {
            // If the C button is only clicked once, then the equation will only delete the last number or symbol in the equation
            removedElement = removedElement.slice(0, removedElement.length-1);
            console.log("removing the " + removedElement + " element");
            problemDisplay.innerText = removedElement
            console.log("After: " + problemDisplay);
        }
        deleteTime = 0;
    }
    // Sets the new timer to a new time
    deleteTime = timer.getTime();
    console.log(timer)
    timer = new Date();
    console.log(timer)
}

// For buttons to be clicked which will activate the clickedHandler function
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", clickedHandler)
}

