"use strict";
const dataAccessLayer = require("./FetchDAL");
const service = require("./profileService");
const component = require("./profileComponent");
const displayAdaptor = require("./ConsoleUiAdaptor");

/**
 * This is the Profile Controller
 */

const DALObj = new dataAccessLayer("http://localhost:3000/profile");
const componentObj = new component(new service(DALObj), new displayAdaptor());

componentObj.getProfiles();
componentObj.createNewProfile('Sanjay', 'Mumbai');
componentObj.getProfiles();



