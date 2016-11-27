// IntegrationTemplate Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var IntegrationTemplateRepository = require('../repositories/IntegrationTemplateRepository.js');


// ---------------------- Class/Constructor ---->>

function IntegrationTemplateService(model, modelName, params) {
    IntegrationTemplateRepository.call(this, model, modelName, params);
    this.layerName = 'IntegrationTemplateService';
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

function inheritPrototype(IntegrationTemplateService, IntegrationTemplateRepository) {
    var prototype = Object.create(IntegrationTemplateRepository.prototype); // Create Object
    prototype.constructor = IntegrationTemplateService; // Augment Object
    IntegrationTemplateService.prototype = prototype; // Assign Object
}

inheritPrototype(IntegrationTemplateService, IntegrationTemplateRepository);

module.exports = IntegrationTemplateService;
