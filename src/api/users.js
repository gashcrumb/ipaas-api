// Users API
'use strict';

// ---------------------- Dependencies ---->>
const Helpers = require('./helpers.js');
var Services = require('../services/index.js');
var UserService = Services.UserService;


// ---------------------- API ---->>

exports.add = function(req, res) {
  var params = req.body;
  if (req.user) {
    params.UserId = req.user.id
  }

  var User = new UserService(params);

  User
    .create()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};


exports.del = function(req, res) {
  var params = {id: req.params.id};
  params.UserId = req.user.id;

  var User = new UserService(params);

  User
    .destroy()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};


exports.find = function(req, res) {
  const Model = require('../models/index.js');
  const db = new Model();
  var params = {};
  params.where = { id: req.params.id };
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, db);
  var User = new UserService(params);

  User
    .find()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};


exports.findAll = function(req, res) {
  const Model = require('../models/index.js');
  const db = new Model();
  var params = {};
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, db);
  var User = new UserService(params);

  User
    .findAll()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};

exports.save = function(req, res) {
  var params = req.body;
  if (req.user) {
    params.UserId = req.user.id
  }

  var User = new UserService(params);

  User
    .save()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};

