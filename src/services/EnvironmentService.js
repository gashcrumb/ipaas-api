// Environment Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var EnvironmentRepository = require('../repositories/EnvironmentRepository.js');


// ---------------------- Class/Constructor ---->>

function EnvironmentService(model, modelName, params) {
    EnvironmentRepository.call(this, model, modelName, params);
    this.layerName = 'EnvironmentService';
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

function inheritPrototype(EnvironmentService, EnvironmentRepository) {
    var prototype = Object.create(EnvironmentRepository.prototype); // Create Object
    prototype.constructor = EnvironmentService; // Augment Object
    EnvironmentService.prototype = prototype; // Assign Object
}

inheritPrototype(EnvironmentService, EnvironmentRepository);

module.exports = EnvironmentService;
