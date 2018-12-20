"use strict";

const fetch=require('node-fetch');

/**
 * This is the DAL layer with Fetch Implementation
 */


class FetchDAL {
  constructor(url) {
    this.url = url;
   // console.log(this.url);
    
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
  //  console.log('value',res);
    
    return res;
  }

  async findById(id) {
  //  console.log('findById:DAL',id);
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
  async patch(profileData) {
    let res = await fetch(this.url + "/" + profileData.id, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
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
