// Basic arithmetic operations
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b === 0) {
    return "lmao";
  }
  return a / b;
};

// Function to perform the arithmetic operation based on their operator
const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return 0;
  }
};

// Get DOM elements
const display = document.getElementById("calculator-display");
const buttons = document.getElementById("calculator-buttons");
const decimalButton = document.getElementById("decimal");

// Variables to track current state
let currentOperator = null;
let firstNumber = null;
let shouldClearDisplay = false;

function addToDisplay(digit) {
  if (display.value === "0" || shouldClearDisplay) {
    display.value = digit;
    shouldClearDisplay = false;
  } else if (digit === "." && display.value.includes(".")) {
    // Do nothing if a decimal point is already present
    return;
  } else if (display.value.length < 9) {
    display.value += digit;
  }
}

// Function to handle operator button click
function addOperator(operator) {
  // Perform calculation if there's already an operator and a first number
  if (currentOperator !== null && firstNumber !== null) {
    calculate();
  }
  // Set the current operator and update the first number
  currentOperator = operator;
  firstNumber = parseFloat(display.value);
  shouldClearDisplay = true; // Set the flag to true
  decimalButton.disabled = false; // Enable the decimal button
}

// Function to clear the display and reset variables
function clearDisplay() {
  display.value = "0";
  currentOperator = null;
  firstNumber = null;
  shouldClearDisplay = false;
  decimalButton.disabled = false;
}

// Function to perform the calculation
function calculate() {
  if (currentOperator !== null && firstNumber !== null) {
    const secondNumber = parseFloat(display.value);
    let result = operate(currentOperator, firstNumber, secondNumber);
    // Check if the result is an error message
    if (typeof result === "string") {
      display.value = result;
    } else {
      // Check if the result is an integer
      if (Number.isInteger(result)) {
        result = parseInt(result);
      } else {
        result = result.toFixed(2);
      }
      display.value = result;
      currentOperator = null;
      firstNumber = parseFloat(result);
      shouldClearDisplay = true;
      decimalButton.disabled = false; // Enable the decimal button
    }
  }
}

function addDecimal() {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
  decimalButton.disabled = true;
}

// Event listener for button clicks
buttons.addEventListener("click", (event) => {
  const button = event.target;
  // Digit button clicked
  if (button.classList.contains("digit")) {
    addToDisplay(button.innerText);
    // Operator button clicked
  } else if (button.classList.contains("operator")) {
    addOperator(button.innerText);
    // Clear button clicked
  } else if (button.id === "clear") {
    clearDisplay();
    // Equals button clicked
  } else if (button.id === "equals") {
    calculate();
  }
});

decimalButton.addEventListener("click", addDecimal);

