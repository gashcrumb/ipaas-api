// ConnectionType Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var ConnectionTypeRepository = require('../repositories/ConnectionTypeRepository.js');


// ---------------------- Class/Constructor ---->>

function ConnectionTypeService(model, modelName, params) {
    ConnectionTypeRepository.call(this, model, modelName, params);
    this.layerName = 'ConnectionTypeService';
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

function inheritPrototype(ConnectionTypeService, ConnectionTypeRepository) {
    var prototype = Object.create(ConnectionTypeRepository.prototype); // Create Object
    prototype.constructor = ConnectionTypeService; // Augment Object
    ConnectionTypeService.prototype = prototype; // Assign Object
}

inheritPrototype(ConnectionTypeService, ConnectionTypeRepository);

module.exports = ConnectionTypeService;
