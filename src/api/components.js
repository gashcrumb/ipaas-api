// Components API
'use strict';

// ---------------------- Dependencies ---->>

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
    var Model, Models;
    var params = {};

    Model = require('../models/index.js');
    Models = new Model();

    params.where = { id: req.params.id };

    // ie: ?include=category&include=file&include=image
    if(req.query.include) {
        for(var i = 0; i < req.query.include.length; i++) {
            var capitalize = req.query.include[i][0].toUpperCase() + req.query.include[i].slice(1);
            includes.push(Models[capitalize]);
        }

        params.include = includes;
    }

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
    var Models = new Model();
    var includes = [];
    var params = {};

    // ie: ?include=category&include=file&include=image
    if(req.query.include) {
        for(var i = 0; i < req.query.include.length; i++) {
            var capitalize = req.query.include[i][0].toUpperCase() + req.query.include[i].slice(1);
            includes.push(Models[capitalize]);
        }

        params.include = includes;
    }

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
