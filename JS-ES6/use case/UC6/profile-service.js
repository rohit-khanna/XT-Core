"use strict";

/**
 * This is the Model class for Profile Service
 */
class ProfileModel {
  constructor(name = "<Enter Name>", city = "<Enter City>") {
    this.name = name;
    this.city = city;
  }
}

/**
 * Profile Service Class
 */
class ProfileService {
  /**
   * Constructor: initializing the URL property
   */
  constructor() {
    this.url = "http://localhost:3000/profile";
  }

  /**
   * Method to handle the response from fetch API call
   * @param {*} res Response Object from fetch Call
   */
  async _handleFetchResponse(res) {
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
      let res = await fetch(this.url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(profile) // body data type must match "Content-Type" header
      });
      return this._handleFetchResponse(res);
    } catch (e) {
      throw new Error("save():" + e);
    }
  }

  /**
   * Return All Profiles
   */
  async findAllAsync() {
    try {
      return this._handleFetchResponse(await fetch(this.url));
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
      return this._handleFetchResponse(await fetch(this.url + "/" + id));
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
      let res = await fetch(this.url + "/" + profile.id, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(profile) // body data type must match "Content-Type" header
      });

      return this._handleFetchResponse(res);
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
      let res = await fetch(this.url + "/" + id, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
      return this._handleFetchResponse(res);
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
   * constuctor function to set Service API reference using DI
   * @param {*} ___service Reference of Service API
   */
  constructor(__service) {
    this.serviceApi = __service;
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
        console.log("The new Profile Created with id:" + res.id);
      })
      .catch(err => console.log(err));
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
          console.log(res);
        })
        .catch(err => console.log(err));
    else
      this.serviceApi
        .findAllAsync()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
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
      console.log("Error: UI:Profile Identifier Not Supplied");
      return;
    }
    let newObj = { id: id };
    if (city) newObj.city = city;
    if (name) newObj.name = name;

    this.serviceApi
      .updateAsync(newObj)
      .then(res => {
        console.log("The Profile Uopdated for id:" + res.id);
      })
      .catch(err => console.log(err));
  }

  /**
   * UI method to Delete a Profile
   * @param {*} id profile identifier
   */
  deleteById(id) {
    if (!id) {
      console.log("Error: UI:Profile Identifier Not Supplied");
      return;
    }
    this.serviceApi
      .removeAsync(id)
      .then(res => {
        console.log("Removed");
      })
      .catch(err => console.log(err));
  }
}

/************************************************************************************* */
const componentObj = new ProfileComponent(new ProfileService());
