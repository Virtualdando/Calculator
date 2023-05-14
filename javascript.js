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

function updateDisplay(content) {
  display.textContent = content;
}

function addToDisplay(digit) {
  if (display.textContent === "0" || shouldClearDisplay) {
    updateDisplay(digit);
    shouldClearDisplay = false;
  } else if (digit === "." && display.textContent.includes(".")) {
    // Do nothing if a decimal point is already present
    return;
  } else if (display.textContent.length < 9) {
    updateDisplay(display.textContent + digit);
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
  firstNumber = parseFloat(display.textContent);
  shouldClearDisplay = true; // Set the flag to true
  decimalButton.disabled = false; // Enable the decimal button
}

// Function to clear the display and reset variables
function clearDisplay() {
  updateDisplay("0");
  currentOperator = null;
  firstNumber = null;
  shouldClearDisplay = false;
  decimalButton.disabled = false;
}

// Function to perform the calculation
function calculate() {
  if (currentOperator !== null && firstNumber !== null) {
    const secondNumber = parseFloat(display.textContent);
    let result = operate(currentOperator, firstNumber, secondNumber);
    // Check if the result is an error message
    if (typeof result === "string") {
      updateDisplay(result);
    } else {
      // Check if the result is an integer
      if (Number.isInteger(result)) {
        result = parseInt(result);
      } else {
        result = result.toFixed(2);
      }
      updateDisplay(result);
      currentOperator = null;
      firstNumber = parseFloat(result);
      shouldClearDisplay = true;
      decimalButton.disabled = false; // Enable the decimal button
    }
  }
}

function calculatePercent() {
  const number = parseFloat(display.value);
  const result = number / 100;
  updateDisplay(result.toFixed(2));
}

function toggleSign() {
  const number = parseFloat(display.value);
 updateDisplay((-1 * number).toString());
}

function addDecimal() {
  if (display.textContent && !display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
  decimalButton.disabled = true;
}



// Event listener for button clicks
buttons.addEventListener("click", (event) => {
  const button = event.target;
  const buttonText = button.innerText;

  // Digit button clicked
  if (button.classList.contains("digit") || button.classList.contains("twoColumns")) {
    addToDisplay(buttonText);
    // Operator button clicked
  } else if (button.classList.contains("operator")) {
    addOperator(buttonText);
    // Clear button clicked
  } else if (button.id === "decimal") {
    addDecimal();
  } else if (button.id === "clear") {
    clearDisplay();
    // Equals button clicked
  } else if (button.id === "equals") {
    calculate();
  } else if (button.id === "percent") {
    calculatePercent();
  } else if (button.id === "sign") {
    toggleSign();
  }
});



