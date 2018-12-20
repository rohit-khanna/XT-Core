"use strict";

class ProfileService {
  /**
   * initializes the Profile Service Object
   * @param {*} DALObject Object of DAL IMplmentation
   */
  constructor(DALObject) {
    this.dalObj = DALObject;
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
      throw {
        status: res.status,
        message: res.statusText
      };
    }
  }

  async saveProductAsync(profileEntity) {
    return new Promise((resolve, reject) => {
      this.dalObj
        .save(profileEntity)
        .then(res => {
          return this._handleDALResponse(res);
        })
        .then(output => {
          resolve(output);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async findProfileAsync(id) {
    return new Promise((resolve, reject) => {
      this.dalObj
        .findById(id)
        .then(res => {
          return this._handleDALResponse(res);
        })
        .then(output => {
          resolve(output);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async findAllProfilesAsync() {
    //console.log('findAllProfilesAsync');

    return new Promise((resolve, reject) => {
      this.dalObj
        .findAll()
        .then(res => {
          //console.log('ok');

          return this._handleDALResponse(res);
        })
        .then(output => {
          //console.log('ok-h');
          resolve(output);
        })
        .catch(err => {
          //console.log('NOok',err);
          reject(err);
        });
    });
  }

  async updateProfileAsync(profile) {
    return new Promise((resolve, reject) => {
      this.dalObj
        .update(profile)
        .then(res => {
          return this._handleDALResponse(res);
        })
        .then(output => {
          resolve(output);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async patchProfileAsync(profile) {
    return new Promise((resolve, reject) => {
      this.dalObj
        .patch(profile)
        .then(res => {
          return this._handleDALResponse(res);
        })
        .then(output => {
          resolve(output);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async deleteProfileAsync(id) {
    return new Promise((resolve, reject) => {
      this.dalObj
        .removeById(id)
        .then(res => {
          return this._handleDALResponse(res);
        })
        .then(output => {
          resolve(output);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ProfileService;
