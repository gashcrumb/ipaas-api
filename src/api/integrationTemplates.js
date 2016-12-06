// IntegrationTemplates API
'use strict';

// ---------------------- Dependencies ---->>
const Helpers = require('./helpers.js');
var Services = require('../services/index.js');
var IntegrationTemplateService = Services.IntegrationTemplateService;


// ---------------------- API ---->>

exports.add = function(req, res) {
    var params = req.body;
    if(req.user) {params.UserId = req.user.id}

    var IntegrationTemplate = new IntegrationTemplateService(params);

    IntegrationTemplate
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

    var IntegrationTemplate = new IntegrationTemplateService(params);

    IntegrationTemplate
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
    var IntegrationTemplate = new IntegrationTemplateService(params);
    IntegrationTemplate
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
    var IntegrationTemplate = new IntegrationTemplateService(params);
    IntegrationTemplate
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

    var IntegrationTemplate = new IntegrationTemplateService(params);

    IntegrationTemplate
        .save()
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
        });
};

