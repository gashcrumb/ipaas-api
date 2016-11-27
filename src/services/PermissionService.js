// Permission Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var PermissionRepository = require('../repositories/PermissionRepository.js');


// ---------------------- Class/Constructor ---->>

function PermissionService(model, modelName, params) {
  PermissionRepository.call(this, model, modelName, params);

  this.layerName = 'PermissionService';

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

function inheritPrototype(PermissionService, PermissionRepository) {
  var prototype = Object.create(PermissionRepository.prototype); // Create Object
  prototype.constructor = PermissionService; // Augment Object
  PermissionService.prototype = prototype; // Assign Object
}

inheritPrototype(PermissionService, PermissionRepository);

module.exports = PermissionService;
