"use strict";

const fun1 = input => {
  return new Promise((resolve, reject) => {
    input === 2 ? resolve(4) : reject(-1); // do some Async Work
  });
};

const fun2 = input => {
  return new Promise((resolve, reject) => {
    input === 4 ? resolve(8) : reject(-1); // do some Async Work
  });
};

const fun3 = input => {
  return new Promise((resolve, reject) => {
    input === 8 ? resolve(16) : reject(-1); // do some Async Work
  });
};

fun1(2)
  .then(val => {
    console.log(val);
    return fun2(val);
  })
  .then(val => {
    console.log(val);
    return fun3(val);
  })
  .then(val => {
    console.log(val);
  })
  .catch(val => {
    console.log(val);
  });
