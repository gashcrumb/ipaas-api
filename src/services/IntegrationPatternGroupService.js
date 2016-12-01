// IntegrationPatternGroup Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var IntegrationPatternGroupRepository = require('../repositories/IntegrationPatternGroupRepository.js');


// ---------------------- Class/Constructor ---->>

function IntegrationPatternGroupService(model, modelName, params) {
  IntegrationPatternGroupRepository.call(this, model, modelName, params);
  this.layerName = 'IntegrationPatternGroupService';
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

function inheritPrototype(IntegrationPatternGroupService, IntegrationPatternGroupRepository) {
  var prototype = Object.create(IntegrationPatternGroupRepository.prototype); // Create Object
  prototype.constructor = IntegrationPatternGroupService; // Augment Object
  IntegrationPatternGroupService.prototype = prototype; // Assign Object
}

inheritPrototype(IntegrationPatternGroupService, IntegrationPatternGroupRepository);

module.exports = IntegrationPatternGroupService;
