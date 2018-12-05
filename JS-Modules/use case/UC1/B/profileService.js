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

export default ProfileService;
