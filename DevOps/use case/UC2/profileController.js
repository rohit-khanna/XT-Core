const express = require("express");
const router = require("express").Router();
const Service = require("./ProfileService");

const dal = require("./FetchDAL");
let service = new Service(new dal("http://localhost:3000/profile"));

router.get("/", (req, res) => {
  service
    .findAllProfilesAsync()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.get("/:id", (req, res) => {
  //res.end("Profile with ID:" + req.params.id);
  service
    .findProfileAsync(req.params.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.post("/", (req, res) => {
  service
    .saveProductAsync(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.put("/:id", (req, res) => {
  service
    .updateProfileAsync(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.patch("/:id", (req, res) => {
  service
    .patchProfileAsync(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.delete("/:id", (req, res) => {
  service
    .deleteProfileAsync(req.params.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

module.exports = router;
