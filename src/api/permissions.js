// Permissions API
'use strict';

// ---------------------- Dependencies ---->>
const Helpers = require('./helpers.js');
var Services = require('../services/index.js');
var PermissionService = Services.PermissionService;


// ---------------------- API ---->>

exports.add = function(req, res) {
  var params = req.body;
  if (req.permission) {
    params.PermissionId = req.permission.id
  }

  var Permission = new PermissionService(params);

  Permission
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
  params.PermissionId = req.permission.id;

  var Permission = new PermissionService(params);

  Permission
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
  var Permission = new PermissionService(params);

  Permission
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
  var Permission = new PermissionService(params);

  Permission
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
  if (req.permission) {
    params.PermissionId = req.permission.id
  }

  var Permission = new PermissionService(params);

  Permission
    .save()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};

