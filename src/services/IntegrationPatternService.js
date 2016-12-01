// IntegrationPattern Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var IntegrationPatternRepository = require('../repositories/IntegrationPatternRepository.js');


// ---------------------- Class/Constructor ---->>

function IntegrationPatternService(model, modelName, params) {
  IntegrationPatternRepository.call(this, model, modelName, params);
  this.layerName = 'IntegrationPatternService';
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

function inheritPrototype(IntegrationPatternService, IntegrationPatternRepository) {
  var prototype = Object.create(IntegrationPatternRepository.prototype); // Create Object
  prototype.constructor = IntegrationPatternService; // Augment Object
  IntegrationPatternService.prototype = prototype; // Assign Object
}

inheritPrototype(IntegrationPatternService, IntegrationPatternRepository);

module.exports = IntegrationPatternService;
