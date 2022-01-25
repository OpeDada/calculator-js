// note: previous operand moves up and current operand is always the newest typed
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
    // we want to allow user to add dot(.) only once
    if (number === "." && this.currentOperand.includes(".")) return; // stop the fnc from running any further
    // we want to update the current operand by appending numbers to each other, e.g a user clicks 1,
    // this is the current currentOperand, if he clicks 1 again,
    // this will append and become 11, if we dont convert it to String,
    // it will become 2 instead of 11.
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // every time a user clicks any of the data operation buttons
  // the argument is the particular operation the user selected
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    // if we want to do a second computation(e.g 5 + 4 * 2), once the user clicks on *, it should have added 5 + 4
    if (this.previousOperand !== "") {
      this.compute();
    }
    // sets the operation the calc will work with
    this.operation = operation;
    // when we click an operation, we are done typing current number, we want to type a new number
    this.previousOperand = this.currentOperand;
    // after clicking he operation, clear out the current operand so we can type a new one
    this.currentOperand = "";
  }

  // this is going to take our values inside of the calculator
  // and compute a single value for what we need to display on the calculator
  compute() {
    let computation; // this variable is going to be the result of our compute fnc
    // convert operands to numbers
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    // switch allows you to do a bunch of if statements on a single object(this.operation)
    switch (this.operation) {
      case "+": // all the code in this case will be executed when this.operation = +
    }
  }

  // this is going to update the values inside our output
  updateDisplay() {
    // set the text of the value in the output
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
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

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay(); // the display values will be updated every time a button is clicked.
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute(); // get the computed value
  calculator.updateDisplay();
});
