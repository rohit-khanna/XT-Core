"use strict";
import ProfileModel from "./profileModel";


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

export default ProfileComponent;
