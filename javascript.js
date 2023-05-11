const add = (a,b) =>  a + b;

const subtract = (a,b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a, b) => b === 0 ? 0 : a / b;

const operate = (operator, a, b) => {
    switch(operator) {
    case '+':
        return add(a, b);
    case '-':
        return subtract(a, b);
    case '*':
        return multiply(a, b);
    case '/':
        return divide(a, b);
    default:
        return 0;
    }
}

const display = document.getElementById('calculator-display');
const buttons = document.getElementById('calculator-buttons');
let currentOperator = null;
let firstNumber = null;

buttons.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('digit')) {
        addToDisplay(button.innerText);
    } else if (button.classList.contains('operator')){
        addOperator(button.innerText);
    } else if (button.id === 'clear') {
        clearDisplay();
    } else if (button.id === 'equals') {
        calculate();
    }
});

function addToDisplay(digit) {
    if (display.value === '0') {
        display.value = digit;
    } else {
        display.value += digit;
    }
}

function addOperator(operator) {
    currentOperator = operator;
    firstNumber = parseFloat(display.value);
    display.value = '0';
}

function clearDisplay () {
    display.value = '0';
    currentOperator = null;
    firstNumber = null;
}

function calculate() {
    const secondNumber = parseFloat(display.value);
    let result = operate(currentOperator, firstNumber, secondNumber);
    display.value = result;
    currentOperator = null;
    firstNumber = result;
}