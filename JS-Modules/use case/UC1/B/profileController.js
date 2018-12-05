"use strict";
import dataAccessLayer from "./FetchDAL";
import service from "./profileService";
import component from "./profileComponent";
import displayAdaptor from "./ConsoleUiAdaptor";

/**
 * This is the Profile Controller
 */

const DALObj = new dataAccessLayer("http://localhost:3000/profile");
const componentObj = new component(new service(DALObj), new displayAdaptor());

componentObj.getProfiles();
componentObj.createNewProfile('Sanjay222', 'Nagpur');
componentObj.getProfiles();



