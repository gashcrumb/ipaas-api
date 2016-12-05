// Connections API
'use strict';

// ---------------------- Dependencies ---->>

const _ = require('lodash');
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
  var Model, Models;
  var params = {};

  Model = require('../models/index.js');
  Models = new Model().models;

  params.where = {id: req.params.id};

  // ie: ?include=category&include=file&include=image
  if (req.query.include) {
    for (var i = 0; i < req.query.include.length; i++) {
      var capitalize = req.query.include[i][0].toUpperCase() + req.query.include[i].slice(1);
      includes.push(Models[capitalize]);
    }
    params.include = includes;
  }

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
  var Models = new Model().models;
  var includes = [];
  var params = {};

  // ie: ?include=category&include=file&include=image
  console.log("Req.query.include: ", req.query.include);
  if (req.query.include) {
    var include = req.query.include;
    if (_.isArray(include)) {
      includes = _.clone(req.query.include);
    } else {
      includes.push(include);
    }
    includes = _.map(includes, (include) => {
      return {
        model: Models[_.capitalize(include)]
      };
    });
    params.include = includes;
  }
  /*
  if (req.query.include) {
    for (var i = 0; i < req.query.include.length; i++) {
      var capitalize = req.query.include[i][0].toUpperCase() + req.query.include[i].slice(1);
      includes.push(Models[capitalize]);
    }
    params.include = includes;
  }
  */
  console.log("Params: ", params);

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

