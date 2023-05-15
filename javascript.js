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
const calculatePercent = (a, b) => (a * b) / 100;

// Function to perform the arithmetic operation based on the operator
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
    case "%":
      return calculatePercent(a, b);
    default:
      return 0;
  }
};

// Get DOM elements
const display = document.getElementById("calculator-display");
const buttons = document.getElementById("calculator-buttons");
const decimalButton = document.getElementById("decimal");
const zeroButton = document.querySelector(".twoColumns");

// Variables to track current state
let currentOperator = null;
let firstNumber = null;
let shouldClearDisplay = false;

// Function to update the display
function updateDisplay(content) {
  display.textContent = content;
}

// Function to add a digit to the display
function addToDisplay(digit) {
  if (display.textContent === "0" && digit === "0") {
    return; // Ignore adding another "0" if the display is already "0"
  }

  if (display.textContent === "0" || shouldClearDisplay) {
    updateDisplay(digit);
    shouldClearDisplay = false;
  } else if (digit === "." && display.textContent.includes(".")) {
    return;
  } else if (display.textContent.length < 9) {
    updateDisplay(display.textContent + digit);
  }
}

// Function to handle operator button click
function addOperator(operator) {
  if (display.textContent === "0") {
    return;
  }
  if (currentOperator !== null && firstNumber !== null) {
    calculate();
  }

  currentOperator = operator;
  firstNumber = parseFloat(display.textContent);
  shouldClearDisplay = true;
  decimalButton.disabled = false;
}

// Function to handle the "0" button click
function addZero() {
  if (shouldClearDisplay) {
    return;
  }
  addToDisplay("0");
}

// Function to clear the display and reset variables
function clearDisplay() {
  updateDisplay("0");
  currentOperator = null;
  firstNumber = null;
  shouldClearDisplay = false;
}

// Function to perform the calculation
function calculate() {
  if (currentOperator !== null && firstNumber !== null) {
    const secondNumber = parseFloat(display.textContent);
    const result = operate(currentOperator, firstNumber, secondNumber);

    if (typeof result === "string") {
      updateDisplay(result);
    } else {
      updateDisplay(result.toFixed(2));
      currentOperator = null;
      firstNumber = parseFloat(result);
      shouldClearDisplay = true;
      decimalButton.disabled = false;
    }
  }
}

// Function to toggle the sign of the number
function toggleSign() {
  const number = parseFloat(display.textContent);
  updateDisplay((-1 * number).toString());
}

// Function to add a decimal point
function addDecimal() {
  if (!display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
  decimalButton.disabled = true;
}

// Add event listeners to the buttons
buttons.addEventListener("click", (event) => {
  const button = event.target;
  const buttonText = button.innerText;

  if (button.id === "clear") {
    clearDisplay();
  } else if (button.id === "sign") {
    toggleSign();
  } else if (button.id === "percent") {
    calculate();
    addOperator("%");
  } else if (button.classList.contains("digit") || button.id === "decimal") {
    addToDisplay(buttonText);
  } else if (button.classList.contains("operator")) {
    addOperator(buttonText);
  } else if (button.id === "equals") {
    calculate();
  } else if (button.classList.contains("operator")) {
    if (buttonText === "/") {
      event.preventDefault();
    }
    addOperator(buttonText);
  }
});

// Add event listener for the decimal button
zeroButton.addEventListener("click", addZero);
decimalButton.addEventListener("click", addDecimal);
