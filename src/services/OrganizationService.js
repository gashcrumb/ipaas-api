// Organization Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var OrganizationRepository = require('../repositories/OrganizationRepository.js');


// ---------------------- Class/Constructor ---->>

function OrganizationService(model, modelName, params) {
  OrganizationRepository.call(this, model, modelName, params);

  this.layerName = 'OrganizationService';

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

function inheritPrototype(OrganizationService, OrganizationRepository) {
  var prototype = Object.create(OrganizationRepository.prototype); // Create Object
  prototype.constructor = OrganizationService; // Augment Object
  OrganizationService.prototype = prototype; // Assign Object
}

inheritPrototype(OrganizationService, OrganizationRepository);

module.exports = OrganizationService;
