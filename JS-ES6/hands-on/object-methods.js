/**
 *
 * Object.Freeze()
 *  This freezes an object.
 *  -   a frozen objectcan no longer be changed.
 *  -   No New Propeties cna be added
 *  -   Existing Properties cant be removed
 *  -   Values of Existing Properties cant be changed
 * ~~~~~~  NOTE:  Values of nested objects can be CHANGED
 *  -   Returns the same object
 */

const testObject = {
  prop1: 23,
  prop2: "ROHIT",
  prop3() {
    console.log("YES");
  },
  prop4: {
    val: 12
  }
};

let sameObj = Object.freeze(testObject);
console.log(`Is old object is same as new:-`, sameObj === testObject);

sameObj.newProp = "RK;"; // Not Allowed and will throw Error in Strict Mode
delete sameObj.prop1; // will throw Error in Strict Mode
sameObj.prop1 = 24; // will throw Error in Strict Mode
sameObj.prop3 = function() {
  console.log("NO");
};
sameObj.prop4.val = 333; // successful change of property
sameObj.prop3(); // prints YES
console.log(sameObj);
console.log("--------------------------");

/** ********************************************************************************************  */

/**
 * Object.seal() -> Marks All properties as NON-Configurable
 *  -   Can change Values of Existing Properties, if they are Writable:true
 *  -   Can Add/delete properties?   NO
 */

const testObject1 = {
  prop1: 23,
  prop2: "ROHIT",
  prop3() {
    console.log("YES");
  },
  prop4: {
    val: 123
  }
};

let sameObj1 = Object.seal(testObject1);
console.log(`SEAL:Is old object is same as new:-`, sameObj1 === testObject1);

sameObj1.newProp = "RK;"; // Not Allowed and will throw Error in Strict Mode
sameObj1.prop1 = 24; // FINE
sameObj1.prop3 = function() {
  // FINE
  console.log("NO");
};
sameObj1.prop4.val = 333; // successful change of property
sameObj1.prop3(); // prints NO
delete sameObj1.prop3; // Not ALlowed
console.log(sameObj1);
console.log("--------------------------");

/** **************************************************************************************  */

/**
 * Object.assign() -  DEEP COPY
 * -    Used to Copy all propeties from Source Object to Target Object
 * -    The properties are overwritten by other objects that have the same properties
 * later in the parameters order
 *
 *  ~~~~  NOTE: It doesnot Deep COPY the NESTED OBJECT PROPERTIES and hence a change
 * in nested object propeties is reflected onto other objects
 *  - Returns the Target Object
 */

const testObject2 = {
  prop1: 23,
  prop2: "ROHIT",
  prop3() {
    console.log("YES");
  },
  prop4: {
    val: 123
  }
};
const addOn = {
  width: 10,
  height: 10
};

//let copyObj = Object.assign({}, testObject2, addOn);
//let copyObj = Object.assign(addOn, testObject2);
let copyObj = Object.assign({}, testObject2);

console.log(copyObj === testObject2);

console.log("copyObj");
console.log(copyObj);
console.log("testObject2");
console.log(testObject2);
//setTimeout(() => {
testObject2.prop1 = "CHANGOING";
copyObj.prop1 = "Another CHANGE";
console.log("copyObj");
console.log(copyObj);
console.log("testObject2");
copyObj.prop4.val = "Modified"; //  Changes All references  :(
console.log(testObject2);
//},3000);

console.log("--------------------------");

/** **************************************************************************************  */

/**
 * Object.preventExtensions() -
 * -    prevents new properties from ever being added to an object
 * (i.e. prevents future extensions to the object)
 *
 *  - Returns the Target Object
 */

const testObject3 = {
  prop1: 23,
  prop2: "ROHIT",
  prop3() {
    console.log("YES");
  },
  prop4: {
    val: 123
  }
};

let sameObj2 = Object.seal(testObject3);
console.log(
  ` PREVENT: Is old object is same as new:-`,
  sameObj2 === testObject3
);

sameObj2.newProp = "RK;"; // Not Allowed and will throw Error in Strict Mode
sameObj2.prop1 = 24; // FINE
sameObj2.prop3 = function() {
  // FINE
  console.log("NO");
};
sameObj2.prop4.val = 333; // successful change of property
sameObj2.prop3(); // prints NO

setTimeout(() => {
  delete sameObj2.prop1; // Doesnot Work
  
  console.log(sameObj2);
  console.log("--------------------------");
}, 1000);
