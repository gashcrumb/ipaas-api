// Integration Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var IntegrationRepository = require('../repositories/IntegrationRepository.js');


// ---------------------- Class/Constructor ---->>

function IntegrationService(model, modelName, params) {
  IntegrationRepository.call(this, model, modelName, params);
  this.layerName = 'IntegrationService';
  //this.params = params;

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
  }
}

// ---------------------- Prototypes ---->>

function inheritPrototype(IntegrationService, IntegrationRepository) {
  var prototype = Object.create(IntegrationRepository.prototype); // Create Object
  prototype.constructor = IntegrationService; // Augment Object
  IntegrationService.prototype = prototype; // Assign Object
}

inheritPrototype(IntegrationService, IntegrationRepository);

module.exports = IntegrationService;
