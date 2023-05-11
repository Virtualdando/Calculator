let firstNumber = 3;
let operator = '+';
let secondNumber = 5;


const add = (a,b) =>  a + b;

const subtract = (a,b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a, b) => b === 0 ? 0 : num1 / num2;

const operate = (operator, num1, num2) => {
    switch(operator) {
    case '+':
        return add(num1, num2);
    case '-':
        return subtract(num1, num2);
    case '*':
        return multiply(num1, num2);
    case '/':
        return divide(num1, num2);
    default:
        return 0;
    }
}

const display = document.getElementById('calculator-display');
const buttons = document.getElementById('calculator-buttons');
let currentOperator = null;
let currentValue = 0;

buttons.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('digit')) {
        addToDisplay(button.innerText);
    } else if (button.classList.contains('operator')){
        addOperator(button.innerText);
    } else if (button.id === clear) {
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
    currentValue = parseFloat(display.value);
    display.value = 0;
}

function