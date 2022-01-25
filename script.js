class Calculator {
  // The constructor takes all the inputs and functions for the calculator
  // It will take the previous and current operand text element
  // this is because we need to know where to place our display text
  constructor(previousOperandTextElement, currentOperandTextElement) {
    // set some variables for this class
    // this gives us a way to set the tet elements inside the calculator class
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); // we want to clear all input nd set them to default values as soon as we create our calc
  }
  // we need to define all the functions/operations the calc can perform
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined; // since they dont have any operation selected if we clear things
  }

  delete() {}

  // every time a user clicks a number to add to the screen
  // the argument is the particular number the user selected
  appendNumber(number) {
    this.currentOperand = number;
  }

  // every time a user clicks any of the data operation buttons
  // the argument is the particular operation the user selected
  chooseOperation(operation) {}

  // this is going to take our values inside of the calculator
  // and compute a single value for what we need to display on the calculator
  compute() {}

  // this is going to update the values inside our output
  updateDisplay() {
    // set the text of the value in the output
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// create a new calculator nd pass everything from our constructor into it.
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// loop over all number buttons and add event listener
// then call the append number fnc up to add the number in each button to the calc
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay(); // the display values will be updated every time a button is clicked.
  });
});
