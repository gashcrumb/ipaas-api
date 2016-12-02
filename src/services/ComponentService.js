// Component Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');

var async = require('async');
var ComponentRepository = require('../repositories/ComponentRepository.js');
var ComponentGroupRepository = require('../repositories/ComponentGroupRepository.js');


// ---------------------- Class/Constructor ---->>

function ComponentService(model, modelName, params) {
    ComponentRepository.call(this, model, modelName, params);
    this.layerName = 'ComponentService';
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

function inheritPrototype(ComponentService, ComponentRepository) {
    var prototype = Object.create(ComponentRepository.prototype); // Create Object
    prototype.constructor = ComponentService; // Augment Object
    ComponentService.prototype = prototype; // Assign Object
}

inheritPrototype(ComponentService, ComponentRepository);

module.exports = ComponentService;
