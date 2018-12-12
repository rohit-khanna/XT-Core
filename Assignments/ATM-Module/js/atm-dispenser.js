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
