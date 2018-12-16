/** 
* PURPOSE      :  This is the Controller file for this module. This is responsible for 
                  1. Registering DOM Events
                  2. Handling DOM Events
                  3. Initializing ATMDispenser Class.
                  4. Update result on UI.
*
* NOTES        :  DONOT refer this file as-is in HTML. Use BUNDLE.js instead.  
*
* AUTHOR       :   Rohit Khanna
*
* LICENSE      :   PUBLIC
*
*/

"use strict";

const Dispenser = require("./atm-dispenser");

window.onload = init();

/**
 * INITIALIZATION Function
 */
function init() {
  //initialize the ATM dispenser
  let atmDispenser = new Dispenser(1, 2, 5, 10, 20, 50, 100, 200, 500, 2000);

  // UI Controls
  let money = document.querySelector("#money");
  var form = document.getElementsByTagName("form")[0];
  form.onsubmit = function(e) {
    e.preventDefault();

    try {
      //1. Call ATM-Dispenser to get the Data Object
      let resultObj = atmDispenser.getDenominations(parseInt(money.value));

      let count = 0;
      //2. Populate the UI Controls
      for (let index in resultObj) {
        let value = resultObj[index];
        if (value > 0) {
          count = count + value;
        }
        document.getElementById(
          "cnt_" + parseInt(index) + "rs"
        ).innerText = value;
      }
      document.getElementById("cnt_total").innerText = count;
      document.querySelector("th").focus();
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * The below code is written because:
   * CSS trick to HIDE the 'numeric spinner' in input-number is not possible
   * Hence. to achieve the desired UI, numeric spinnner is made hidden in Chrome using CSS
   * while "number only input" functionality wa sachieved by capturing keyPress event
   * on NON Chrome Browsers ONLY
   */
  if (
    navigator.userAgent.toString().includes("Firefox") ||
    navigator.userAgent.toString().includes("Edge")
  ) {
    money.onkeypress = function(e) {
      return isNumberKey(e);
    };
  }

  /**
   * Listen to Input Event to enable/disable Submit Button
   */
  money.addEventListener("input", function(e) {
    onInputChange(e);
  });
}

/**
 * Handler for Input Change
 * @param {*} e event Object
 */
function onInputChange(e) {
  let submitButton = document.querySelector(".left-pane__submit");
  let value = e.target.value;
  if (!value) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("disabled");
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("disabled");
  }
}

/**
 * Checks whether the input object corponds to a Numeric Key
 * @param {*} evt Event Object
 */
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode >= 48 && charCode <= 57) return true;
  return false;
}
