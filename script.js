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

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); // remove the last value of the string
  }

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
      case "+": // all the code in this case will be executed when this.operation is +
        computation = prev + current;
        break; // means dont follow any other case statements.
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      // default is like else
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // delimiting values with commas
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    // the stringNumber takes our string and turns it into an array
    // the first number is before the dot[0] and the second number is after the dot[1]
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    // if integerDigits is a not a number
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    // if the user entered a digit and enters a period after
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // this is going to update the values inside our output
  updateDisplay() {
    // set the text of the value in the output
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    // to display the operation figure beside the previous operand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
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

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
