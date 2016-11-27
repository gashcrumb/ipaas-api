// Connection Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ConnectionRepository = require('../repositories/ConnectionRepository.js');


// ---------------------- Class/Constructor ---->>

function ConnectionService(model, modelName, params) {
  ConnectionRepository.call(this, model, modelName, params);
  this.layerName = 'ConnectionService';
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

function inheritPrototype(ConnectionService, ConnectionRepository) {
  var prototype = Object.create(ConnectionRepository.prototype); // Create Object
  prototype.constructor = ConnectionService; // Augment Object
  ConnectionService.prototype = prototype; // Assign Object
}

inheritPrototype(ConnectionService, ConnectionRepository);

module.exports = ConnectionService;
