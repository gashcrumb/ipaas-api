// StepType Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var StepTypeRepository = require('../repositories/StepTypeRepository.js');


// ---------------------- Class/Constructor ---->>

function StepTypeService(model, modelName, params) {
    StepTypeRepository.call(this, model, modelName, params);
    this.layerName = 'StepTypeService';
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

function inheritPrototype(StepTypeService, StepTypeRepository) {
    var prototype = Object.create(StepTypeRepository.prototype); // Create Object
    prototype.constructor = StepTypeService; // Augment Object
    StepTypeService.prototype = prototype; // Assign Object
}

inheritPrototype(StepTypeService, StepTypeRepository);

module.exports = StepTypeService;
