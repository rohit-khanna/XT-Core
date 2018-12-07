"use strict";
var result = 0;
var obj = { first: "", opp: "", second: "" };

function init() {
  setResult(0);

  var buttonSection = document.querySelector("#section-button");
  buttonSection.addEventListener("click", function(e) {
    let element = e.target;

    switch (element.getAttribute("name")) {
      case "opp":
        handleOperator(element.innerText);
        updateUiFormula();
        break;
      case "special":
        handleSpecial(element.innerText);
        updateUiFormula();
        break;
      case "val":
        handleValue(element.innerText);
        updateUiFormula();
        break;

      default:
        break;
    }
  });
}

window.onload = init;

function handleOperator(op) {
  if (obj.first && obj.second) {
    if (op !== "=") obj.opp = op;
    obj.first = calculateResult();
    obj.opp = "";
    obj.second = "";
  } else if (obj.first && !obj.second) {
    obj.opp = op;
  }
}

function updateUiFormula() {
  document.getElementById("obj").innerText = `${obj.first} ${obj.opp} ${
    obj.second
  }`;
}

function handleSpecial(value) {
  obj.first = "";
  obj.opp = "";
  obj.second = "";
  setResult(0);
}

function handleValue(val) {
  if (!obj.first) {
    obj.first = val;
    setResult(obj.first);
  } else if (!obj.opp) {
    obj.first += val;
    setResult(obj.first);
  } else if (!obj.second) {
    obj.second = val;
    setResult(obj.second);
  } else {
    obj.second += val;
    setResult(obj.second);
  }
}

function calculateResult() {
  return setResult(consoleCalculator(obj.first, obj.opp, obj.second));
}

function setResult(value) {
  var resultTxt = document.querySelector("#result");
  resultTxt.value = value;
  return value;
}

/**
 * Console based Calculator to demonstrate Core JS Concepts
 *  - Variables, Literals
 *  - Operators
 *  - functions, parameters and arguments
 *
 * BUSINESS RULES:
 *  - "2" is a valid input for number, while "c2c" is not.
 *  - Operands supported: [+ - * X % /]
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
    case "X":
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
  console.log(result);

  return result;
}
