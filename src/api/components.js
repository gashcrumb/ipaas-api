// Components API
'use strict';

// ---------------------- Dependencies ---->>
const Helpers = require('./helpers.js');
var Services = require('../services/index.js');
var ComponentService = Services.ComponentService;


// ---------------------- API ---->>

exports.add = function(req, res) {
    var params = req.body;
    if(req.user) {params.UserId = req.user.id}

    var Component = new ComponentService(params);

    Component
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

    var Component = new ComponentService(params);

    Component
        .destroy()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};


exports.find = function (req, res) {
    var Model, models;
    Model = require('../models/index.js');
    models = new Model().models;
    var params = {};
    params.where = { id: req.params.id };
    // ie: ?include=category&include=file&include=image
    Helpers.applyModelIncludes(params, req, models);
    var Component = new ComponentService(params);
    Component
        .find()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};


exports.findAll = function (req, res) {
    var Model = require('../models/index.js');
    var models = new Model().models;
    var params = {};
    // ie: ?include=category&include=file&include=image
    Helpers.applyModelIncludes(params, req, models);
    var Component = new ComponentService(params);
    Component
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

    var Component = new ComponentService(params);

    Component
        .save()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};

