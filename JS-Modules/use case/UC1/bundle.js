(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * This is the UI Adaptor using COnsole as Output Medium
 */

class ConsoleDisplayAdaptor {
  log(...data) {
    console.log(...data);
  }

  logE(msg) {
    console.error(msg);
  }
}

module.exports = ConsoleDisplayAdaptor;

},{}],2:[function(require,module,exports){
"use strict";

/**
 * This is the DAL layer with Fetch Implementation
 */

class FetchDAL {
  constructor(url) {
    this.url = url;
  }

  async save(profileData) {
    let res = await fetch(this.url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(profileData) // body data type must match "Content-Type" header
    });
    return res;
  }

  async findAll() {
    let res = await fetch(this.url);
    return res;
  }

  async findById(id) {
    let res = await fetch(this.url + "/" + id);
    return res;
  }

  async update(profileData) {
    let res = await fetch(this.url + "/" + profileData.id, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(profileData) // body data type must match "Content-Type" header
    });
    return res;
  }

  async removeById(id) {
    let res = await fetch(this.url + "/" + id, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    return res;
  }
}

module.exports = FetchDAL;

},{}],3:[function(require,module,exports){
"use strict";
const ProfileModel = require("./profileModel");

/**
 * This is the Ui controller for Profile Service.
 */

class ProfileComponent {
  /**
   * constuctor function to set Service API, Output Adaptor reference using DI
   * @param {*} ___service
   * @param {*} ___outputAdaptor
   */
  constructor(__service, __outputAdaptor) {
    this.serviceApi = __service;
    this.outputAdaptor = __outputAdaptor;
  }

  /**
   * UI Method to create a New Profile
   * @param {String} name name
   * @param {String} city city
   */
  createNewProfile(name, city) {
    const modelObj = new ProfileModel(name, city);
    this.serviceApi
      .saveAsync(modelObj)
      .then(res => {
        this.outputAdaptor.log("The new Profile Created with id:", res.id);
      })
      .catch(err => this.outputAdaptor.logE(err));
  }

  /**
   * UI method to Fetch Profiles.
   * <p>If id is not supplied, fetches all.</p>
   * @param {*} id identifier for profile
   */
  getProfiles(id) {
    if (id)
      this.serviceApi
        .findByIdAsync(id)
        .then(res => {
          this.outputAdaptor.log(res);
        })
        .catch(err => this.outputAdaptor.logE(err));
    else
      this.serviceApi
        .findAllAsync()
        .then(res => {
          this.outputAdaptor.log(res);
        })
        .catch(err => this.outputAdaptor.logE(err));
  }

  /**
   * UI method to Update the Profile
   * <p>ID is mandatory</p>
   * <p>If any other propety is not supplied, that will REMOVED from backend</p>
   * @param {*} id profile Identifier
   * @param {*} city new city
   * @param {*} name  new name
   */
  update(id, city, name) {
    if (!id) {
      this.outputAdaptor.logE("Error: UI:Profile Identifier Not Supplied");
      return;
    }
    let newObj = { id: id };
    if (city) newObj.city = city;
    if (name) newObj.name = name;

    this.serviceApi
      .updateAsync(newObj)
      .then(res => {
        this.outputAdaptor.log("The Profile Uopdated for id:", res.id);
      })
      .catch(err => this.outputAdaptor.logE(err));
  }

  /**
   * UI method to Delete a Profile
   * @param {*} id profile identifier
   */
  deleteById(id) {
    if (!id) {
      this.outputAdaptor.logE("Error: UI:Profile Identifier Not Supplied");
      return;
    }
    this.serviceApi
      .removeAsync(id)
      .then(res => {
        this.outputAdaptor.log("Removed", res);
      })
      .catch(err => this.outputAdaptor.logE(err));
  }
}

module.exports = ProfileComponent;

},{"./profileModel":5}],4:[function(require,module,exports){
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




},{"./ConsoleUiAdaptor":1,"./FetchDAL":2,"./profileComponent":3,"./profileService":6}],5:[function(require,module,exports){
"use strict";

/**
 * This is the Model for PROFILE Service
 */
class ProfileModel {
  constructor(name = "<Enter Name>", city = "<Enter City>") {
    this.name = name;
    this.city = city;
  }
}

module.exports = ProfileModel;

},{}],6:[function(require,module,exports){
"use strict";

/**
 * This is the Profile Service
 */

class ProfileService {
  /**
   * Constructor: initializing the URL property
   */
  constructor(DALObj) {
    this.dal = DALObj;
  }

  /**
   * Method to handle the response from DAL API call
   * @param {*} res Response Object from DAL Call
   */
  async _handleDALResponse(res) {
    if (res.status === 200 || res.status === 201) {
      let result = await res.json();
      return result;
    } else {
      throw "ServiceAPI Call failed. Status Code:" +
        res.status +
        "  " +
        res.statusText;
    }
  }

  /**
   * This is Save method to insert new record
   */
  async saveAsync(profile) {
    try {
      let res = await this.dal.save(profile);
      return this._handleDALResponse(res);
    } catch (e) {
      throw new Error("save():" + e);
    }
  }

  /**
   * Return All Profiles
   */
  async findAllAsync() {
    try {
      return this._handleDALResponse(await this.dal.findAll());
    } catch (error) {
      throw new Error("findAll():" + error);
    }
  }

  /**
   * return profile by Id
   * @param {*} id Identifier
   */
  async findByIdAsync(id) {
    try {
      return this._handleDALResponse(await this.dal.findById(id));
    } catch (error) {
      throw new Error("findById():" + error);
    }
  }

  /**
   * Update profile by Id
   * @param {*} id identifier
   */
  async updateAsync(profile) {
    try {
      let res = await this.dal.update(profile);
      return this._handleDALResponse(res);
    } catch (e) {
      throw new Error("update():" + e);
    }
  }

  /**
   * Remove the Profile with ID
   * @param {*} id identifier
   */
  async removeAsync(id) {
    try {
      let res = await this.dal.removeById(id);
      return this._handleDALResponse(res);
    } catch (e) {
      throw new Error("remove():" + e);
    }
  }
}

module.exports = ProfileService;

},{}]},{},[4]);
