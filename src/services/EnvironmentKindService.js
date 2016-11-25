// EnvironmentKind Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var EnvironmentKindRepository = require('../repositories/EnvironmentKindRepository.js');


// ---------------------- Class/Constructor ---->>

function EnvironmentKindService(model, modelName, params) {
    EnvironmentKindRepository.call(this, model, modelName, params);
    this.layerName = 'EnvironmentKindService';
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

function inheritPrototype(EnvironmentKindService, EnvironmentKindRepository) {
    var prototype = Object.create(EnvironmentKindRepository.prototype); // Create Object
    prototype.constructor = EnvironmentKindService; // Augment Object
    EnvironmentKindService.prototype = prototype; // Assign Object
}

inheritPrototype(EnvironmentKindService, EnvironmentKindRepository);

module.exports = EnvironmentKindService;
