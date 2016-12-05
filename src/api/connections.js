// Connections API
'use strict';

// ---------------------- Dependencies ---->>
const _ = require('lodash');
const Helpers = require('./helpers.js');

var Services = require('../services/index.js');
var ConnectionService = Services.ConnectionService;


// ---------------------- API ---->>

exports.add = function(req, res) {
  var params = req.body;
  if (req.user) {
    params.UserId = req.user.id
  }

  var Connection = new ConnectionService(params);

  Connection
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

  var Connection = new ConnectionService(params);

  Connection
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
  const models = new Model().models;
  const params = {};
  params.where = {id: req.params.id};
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, models);
  var Connection = new ConnectionService(params);
  Connection
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
  const models = new Model().models;
  var params = {};
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, models);
  var Connection = new ConnectionService(params);
  Connection
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

  var Connection = new ConnectionService(params);

  Connection
    .save()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
};

