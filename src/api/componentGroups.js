// ComponentGroups API
'use strict';

// ---------------------- Dependencies ---->>

var Services = require('../services/index.js');
var ComponentGroupService = Services.ComponentGroupService;


// ---------------------- API ---->>

exports.add = function(req, res) {
    var params = req.body;
    if(req.user) {params.UserId = req.user.id}

    var ComponentGroup = new ComponentGroupService(params);

    ComponentGroup
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

    var ComponentGroup = new ComponentGroupService(params);

    ComponentGroup
        .destroy()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};


exports.find = function (req, res) {
  const Model = require('../models/index.js');
  const db = new Model();
  var params = {};
  params.where = { id: req.params.id };
  // ie: ?include=category&include=file&include=image
  Helpers.applyModelIncludes(params, req, db);
    var ComponentGroup = new ComponentGroupService(params);

    ComponentGroup
        .find()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};


exports.findAll = function (req, res) {
    const Model = require('../models/index.js');
    const db = new Model();
    var params = {};
    // ie: ?include=category&include=file&include=image
    Helpers.applyModelIncludes(params, req, db);
    var ComponentGroup = new ComponentGroupService(params);

    ComponentGroup
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
    if(req.user) {params.UserId = req.user.id}

    var ComponentGroup = new ComponentGroupService(params);

    ComponentGroup
        .save()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};

