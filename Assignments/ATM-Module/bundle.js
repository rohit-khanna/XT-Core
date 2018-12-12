(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * PURPOSE      :   this function constructor provides the funtionalities of ATM Dispensing.
 *                  This returns an Object which has the least number of notes needed to get to
 *                  the exact amount from ATM.
 *
 * NOTES        :   Create an Instance of this function constuctor by passing comma separated Integer
 *                  Denominations     eg: let obj= new ATMDispenser(1,2,5,50,200,2000,100);
 *
 * AUTHOR       :   Rohit Khanna
 *
 * LICENSE      :   PUBLIC
 *
 */

"use strict"

function ATMDispenser(...availableDenomination) {
  let denominationArray = getRevSortedDenominationArray([
    ...availableDenomination
  ]);

  /**
   * method to return the Reverse Sorted Array
   * @param {*} array unsorted Array
   */
  function getRevSortedDenominationArray(array) {
    if (!array) return [];
    return array.sort((a, b) => {
      return b - a;
    });
  }

  /**
   * method to denominate the input amount and return an object
   * of type {denomination:<note-count>}
   * @param {*} amount Amount to Denominate
   */
  function getDenominationsForAmount(amount) {
    if (amount < 0) {
      throw new Error("Enter an amount greater than 0");
    }
    let denoObj = {};
    let value = amount;

    denominationArray.forEach(ele => {
      denoObj[ele] = denoObj[ele] || 0;
      let { notes, balance } = DenominateAmount(ele, value);
      value = balance;
      denoObj[ele] = notes;
    });
    if (value === 0) return denoObj;
    else
      throw new Error(
        "Not able to dispense this amount.Please try again with multiples of:" +
          [...denominationArray] +
          ""
      );
  }

  /**
   * method to Denominate the amount
   * @param {*} denomination denomination to apply
   * @param {*} amount amount to denominate
   */
  function DenominateAmount(denomination, amount) {
    let balance = parseInt(amount) % parseInt(denomination);
    let notes = parseInt(parseInt(amount) / parseInt(denomination));
    return { balance, notes };
  }

  /**
   * PUBLIC INTERFACE
   */
  return {
    getDenominations: getDenominationsForAmount
  };
}

module.exports = ATMDispenser;

},{}],2:[function(require,module,exports){
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
  let atmDispenser = new Dispenser( 5, 10, 20, 50, 100, 200, 500, 2000);

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
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode >= 48 && charCode <= 57) return true;
  return false;
}

},{"./atm-dispenser":1}]},{},[2]);
