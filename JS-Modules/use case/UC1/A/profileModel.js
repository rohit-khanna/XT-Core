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
