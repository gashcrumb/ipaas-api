// Report Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ReportRepository = require('../repositories/ReportRepository.js');


// ---------------------- Class/Constructor ---->>

function ReportService(model, modelName, params) {
  ReportRepository.call(this, model, modelName, params);

  this.layerName = 'ReportService';

  this.mix = function mix() {
    var arg, prop, child = {};
    for (arg = 0; arg < arguments.length; arg += 1) {
      for (prop in arguments[arg]) {
        if (arguments[arg].hasOwnProperty(prop)) {
          child[prop] = arguments[arg][prop];
        }
      }
    }
    return child;
  };
}

// ---------------------- Prototypes ---->>

function inheritPrototype(ReportService, ReportRepository) {
  var prototype = Object.create(ReportRepository.prototype); // Create Object
  prototype.constructor = ReportService; // Augment Object
  ReportService.prototype = prototype; // Assign Object
}

inheritPrototype(ReportService, ReportRepository);

module.exports = ReportService;
