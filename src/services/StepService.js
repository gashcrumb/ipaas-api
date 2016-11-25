// Step Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var StepRepository = require('../repositories/StepRepository.js');


// ---------------------- Class/Constructor ---->>

function StepService(model, modelName, params) {
  StepRepository.call(this, model, modelName, params);

  this.layerName = 'StepService';

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

function inheritPrototype(StepService, StepRepository) {
  var prototype = Object.create(StepRepository.prototype); // Create Object
  prototype.constructor = StepService; // Augment Object
  StepService.prototype = prototype; // Assign Object
}

inheritPrototype(StepService, StepRepository);

module.exports = StepService;
