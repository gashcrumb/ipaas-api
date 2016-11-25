// IntegrationRuntime Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var IntegrationRuntimeRepository = require('../repositories/IntegrationRuntimeRepository.js');


// ---------------------- Class/Constructor ---->>

function IntegrationRuntimeService(model, modelName, params) {
    IntegrationRuntimeRepository.call(this, model, modelName, params);
    this.layerName = 'IntegrationRuntimeService';
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

function inheritPrototype(IntegrationRuntimeService, IntegrationRuntimeRepository) {
    var prototype = Object.create(IntegrationRuntimeRepository.prototype); // Create Object
    prototype.constructor = IntegrationRuntimeService; // Augment Object
    IntegrationRuntimeService.prototype = prototype; // Assign Object
}

inheritPrototype(IntegrationRuntimeService, IntegrationRuntimeRepository);

module.exports = IntegrationRuntimeService;
