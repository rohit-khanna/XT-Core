"use strict";
/**
 * Implement PROMISES _ Async
 *
 * BUSINESS RULE:
 *  If the username and password are sapient and sapient, it should
 *   return "Welcome sapient"
 *  ELSE
 *   show the relevant error
 */

const dashboard = user => {
  console.log("Welcome " + user);
};

const loginHandlerAsync = credentials => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.id === "sapient" && credentials.pwd === "sapient")
        resolve(credentials.id);
      else reject({ err: "Login Credentials Mismatch" });
    }, 1000);
  });
};

const getUserAsync = _ => {
  let mockUser = {
    id: "sapient",
    pwd: "sapient"
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockUser ? resolve(mockUser) : reject({ err: "Data not found" });
    }, 1000);
  });
};

/**
 * ****************  TEST CASES  *******************
 */

getUserAsync()
  .then(response => {
    return loginHandlerAsync(response);
  })
  .then(response => {
    dashboard(response);
  })
  .catch(err => console.log(err));
