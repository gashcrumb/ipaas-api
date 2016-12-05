// Roles API
'use strict';

// ---------------------- Dependencies ---->>
const Helpers = require('./helpers.js');
var Services = require('../services/index.js');
var UserService = Services.UserService;
var RoleService = Services.RoleService;


// ---------------------- API ---->>

exports.add = function(req, res) {
  var params = req.body;
  if (req.role) {
    params.RoleId = req.role.id
  }

  var Role = new RoleService(params);

  Role
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
  params.RoleId = req.role.id;

  var Role = new RoleService(params);

  Role
    .destroy()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};


exports.find = function(req, res) {
  var Model, models;
  Model = require('../models/index.js');
  models = new Model().models;
  var params = {};
  params.where = { id: req.params.id };
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, models);
  var Role = new RoleService(params);

  Role
    .find()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};


exports.findAll = function(req, res) {
  var Model = require('../models/index.js');
  var models = new Model().models;
  var params = {};
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, models);
  var Role = new RoleService(params);

  Role
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
  if (req.role) {
    params.RoleId = req.role.id
  }

  var Role = new RoleService(params);

  Role
    .save()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};

