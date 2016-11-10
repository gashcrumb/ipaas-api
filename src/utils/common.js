// Common Utility

/*
 This utility is intended to share states between modules commonly used together.
 */

// ---------------------- Admin ---->>

var admin = require('../../server.js');

exports.admin = admin;


// ---------------------- Src ---->>

var src = require('../index.js');
var exceptions = require('../exceptions/index.js');
var models = require('../models/index.js');
var repositories = require('../repositories/index.js');
var services = require('../services/index.js');
var utils = require('./index.js');

exports.src = src;
exports.exceptions = exceptions;
exports.models = models;
exports.repositories = repositories;
exports.services = services;
exports.utils = utils;
