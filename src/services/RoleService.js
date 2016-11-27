// Role Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var RoleRepository = require('../repositories/RoleRepository.js');


// ---------------------- Class/Constructor ---->>

function RoleService(model, modelName, params) {
  RoleRepository.call(this, model, modelName, params);

  this.layerName = 'RoleService';

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

function inheritPrototype(RoleService, RoleRepository) {
  var prototype = Object.create(RoleRepository.prototype); // Create Object
  prototype.constructor = RoleService; // Augment Object
  RoleService.prototype = prototype; // Assign Object
}

inheritPrototype(RoleService, RoleRepository);

module.exports = RoleService;
