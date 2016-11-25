// EnvironmentType Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var EnvironmentTypeRepository = require('../repositories/EnvironmentTypeRepository.js');


// ---------------------- Class/Constructor ---->>

function EnvironmentTypeService(model, modelName, params) {
    EnvironmentTypeRepository.call(this, model, modelName, params);
    this.layerName = 'EnvironmentTypeService';
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

function inheritPrototype(EnvironmentTypeService, EnvironmentTypeRepository) {
    var prototype = Object.create(EnvironmentTypeRepository.prototype); // Create Object
    prototype.constructor = EnvironmentTypeService; // Augment Object
    EnvironmentTypeService.prototype = prototype; // Assign Object
}

inheritPrototype(EnvironmentTypeService, EnvironmentTypeRepository);

module.exports = EnvironmentTypeService;
