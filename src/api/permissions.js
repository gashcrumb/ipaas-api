// Permissions API
'use strict';

// ---------------------- Dependencies ---->>

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
  var Model, Models;
  var params = {};

  Model = require('../models/index.js');
  Models = new Model();

  params.where = {id: req.params.id};

  // ie: ?include=category&include=file&include=image
  if (req.query.include) {
    for (var i = 0; i < req.query.include.length; i++) {
      var capitalize = req.query.include[i][0].toUpperCase() + req.query.include[i].slice(1);
      includes.push(Models[capitalize]);
    }

    params.include = includes;
  }

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
  var Model = require('../models/index.js');
  var Models = new Model();
  var includes = [];
  var params = {};

  // ie: ?include=category&include=file&include=image
  if (req.query.include) {
    for (var i = 0; i < req.query.include.length; i++) {
      var capitalize = req.query.include[i][0].toUpperCase() + req.query.include[i].slice(1);
      includes.push(Models[capitalize]);
    }

    params.include = includes;
  }

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

