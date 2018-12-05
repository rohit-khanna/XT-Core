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

export default FetchDAL;
