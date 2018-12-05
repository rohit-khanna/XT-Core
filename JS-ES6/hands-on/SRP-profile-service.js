"use strict";

/**
 * Modified as per SRP
 */

/**
 * This is the Model class for Profile Service
 */
class ProfileModel {
  constructor(name = "<Enter Name>", city = "<Enter City>") {
    this.name = name;
    this.city = city;
  }
}

class ProfileService_FetchDAL {
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

/**
 * Profile Service Class
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
/************************************************************************************ */

/**
 * Profile Component UI
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
   * MODIFIED FOR COMSUMPTION FROM UI...
   * @param {*} id identifier for profile
   */
  getProfiles(id) {
    return new Promise((resolve, reject)=> {
      if (id)
        this.serviceApi
          .findByIdAsync(id)
          .then(res => {
            this.outputAdaptor.log(res);
            resolve(res);
          })
          .catch(err => {
            this.outputAdaptor.logE(err);
            reject(err);
          });
      else
        this.serviceApi
          .findAllAsync()
          .then(res => {
            this.outputAdaptor.log(res);
            resolve(res);
          })
          .catch(err => {
            this.outputAdaptor.logE(err);
            reject(err);
          });
    });
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

class ConsoleDisplayAdaptor {
  log(...data) {
    console.log(...data);
  }

  logE(msg) {
    console.error(msg);
  }
}

/************************************************************************************* */
const DALObj = new ProfileService_FetchDAL("http://localhost:3000/profile");
const componentObj = new ProfileComponent(
  new ProfileService(DALObj),
  new ConsoleDisplayAdaptor()
);
