/**
 * Console based Calculator to demonstrate Core JS Concepts
 *  - Variables, Literals
 *  - Operators
 *  - functions, parameters and arguments
 *
 * BUSINESS RULES:
 *  - "2" is a valid input for number, while "c2c" is not.
 *  - Operands supported: [+ - * % /]
 */

function consoleCalculator(...args) {
  if (!args) {
    return;
  }
  if (args.length < 3) {
    return "Invalid Operation. Insufficient params supplied";
  }

  const firstOperand = parseFloat(args[0]);
  const operator = args[1];
  const secondOperand = parseFloat(args[2]);

  if (isNaN(firstOperand) || isNaN(secondOperand)) {
    return "Invalid Operands. Please input numbers only.";
  }
  let result = 0;
  let isOperatorValid = true;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = firstOperand / secondOperand;
      break;
    case "%":
      result = firstOperand % secondOperand;
      break;

    default:
      isOperatorValid = false;
      break;
  }

  if (!isOperatorValid) {
    return "Invalid Operator. Please input any one of these [+ - * % /]";
  }
  return result;
}

/*************** TEST CASES ******************* */
console.log(consoleCalculator(2, "+", 3)); // result should be 5
console.log(consoleCalculator(2, "-", 3)); // result should be -1
console.log(consoleCalculator(2, "*", 3)); // result should be 6
console.log(consoleCalculator(2, "/", 3)); // result should be 0.66666
console.log(consoleCalculator(2, "/", 0)); // result should be Infinity

console.log(consoleCalculator(2, "%", 3)); // result should be 2
console.log(consoleCalculator("2", "%", 3)); // result should be 2

console.log(consoleCalculator(2, "%")); // Invalid Operation. Insufficient params supplied
console.log(consoleCalculator(2)); // Invalid Operation. Insufficient params supplied
console.log(consoleCalculator(2, "3")); // Invalid Operation. Insufficient params supplied

console.log(consoleCalculator("2", "%", "a3a")); // Invalid Operands. Please input numbers only.
console.log(consoleCalculator("2", "(", "3")); // Invalid Operator. Please input any one of these [+ - * % /]

console.log(consoleCalculator()); //Invalid Operation. Insufficient params supplied
