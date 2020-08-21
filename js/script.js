var ops = document.querySelectorAll(".operator");
var num = document.querySelectorAll(".number");
var screen = document.getElementById("displayScreen");
let equalTo = document.getElementById("equal-to");
let clear = document.getElementById("clear");
let del = document.getElementById("delete");
let dot = document.getElementById("period")
let numRegex = /[0-9]/ig;


// **THE MAIN STORAGE**//
let calcMemory = {
    firstOperand: "",
    operator: "",
    secondOperand: "",
    answer: ""
}

// **FOR THE DEL BUTTON**//
let delBtn = function () {
    if (calcMemory.firstOperand.length > 0 && calcMemory.operator == "") {
        calcMemory.firstOperand = calcMemory.firstOperand.slice(0, calcMemory.firstOperand.length - 1);
        display();
    } else if (calcMemory.operator !== "" && calcMemory.secondOperand == "") {
        calcMemory.operator = "";
        display();
    } else if (calcMemory.secondOperand.length > 0) {
        calcMemory.secondOperand = calcMemory.secondOperand.slice(0, calcMemory.secondOperand.length - 1);
        display();
    }
}

//**FOR THE CLR BUTTON**//
clear.addEventListener("click", function () {
    calcMemory.firstOperand = "";
    calcMemory.secondOperand = "";
    calcMemory.operator = "";
    display();
    screen.innerText = "Cleared"
});

// **FOR THE PERIOD BUTTON**//
let periodBtn = function () {
    if (calcMemory.operator == "" && !calcMemory.firstOperand.includes(".")) {
        calcMemory.firstOperand += ".";
        display();
    } else if (calcMemory.operator !== "" && !calcMemory.secondOperand.includes(".")) {
        calcMemory.secondOperand += ".";
        display();
    }
}

// **THE SOLVER**//
let solve = function () {
    let firstNum = Number.parseFloat(calcMemory.firstOperand);
    let secNum = Number.parseFloat(calcMemory.secondOperand);
    let result = null;
        if (calcMemory.operator == "+") {
            result = firstNum + secNum;
        } else if (calcMemory.operator == "-") {
            result = firstNum - secNum;
        } else if (calcMemory.operator == "/") {
            result = firstNum / secNum;
        } else if (calcMemory.operator == "x") {
            result = firstNum * secNum;
        }
        calcMemory.firstOperand = result;
        calcMemory.secondOperand = "";
        calcMemory.operator = "";
        display();
}

// **FOR THE DISPLAY**//
let display = function () {
    screen.innerText = `${calcMemory.firstOperand}${calcMemory.operator}${calcMemory.secondOperand}`;
};

// **FOR THE OPERANDS**//
num.forEach(function (e) {
    e.addEventListener("click", function () {
        if (calcMemory.operator === "") {
             calcMemory.firstOperand += e.innerText
             display();
        } else if (calcMemory.operator !== "") {
            calcMemory.secondOperand += e.innerText;
            display();
        }
    })
});

// **FOR THE SIGNS**//
ops.forEach(function(g) {
    g.addEventListener("click", function() {
        if (calcMemory.firstOperand === "") {
            if (g.innerText == "+" || g.innerText == "-") {
                calcMemory.firstOperand = g.innerText;
                display();
            } else {
                screen.innerText = "Input Error";
            }
        } else if (calcMemory.firstOperand !== "" && numRegex.test(calcMemory.firstOperand) && calcMemory.operator == "") {
                calcMemory.operator = g.innerText;
                display();
        }   else if (calcMemory.secondOperand !== "" && numRegex.test(calcMemory.secondOperand)) {
            solve();
            calcMemory.operator = g.innerText;
            display();
        }   else if (calcMemory.operator !== "" ) {
            if (g.innerText == "+" || g.innerText == "-") {
                calcMemory.secondOperand = g.innerText;
                display();
            } else {
                screen.innerText = "Input Error";
            }
        } 
        }
    )
});

del.addEventListener("click", delBtn);
equalTo.addEventListener("click", solve);
dot.addEventListener("click", periodBtn);