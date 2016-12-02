// ComponentGroup Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ComponentGroupRepository = require('../repositories/ComponentGroupRepository.js');
var UserRepository = require('../repositories/UserRepository.js');


// ---------------------- Class/Constructor ---->>

function ComponentGroupService(model, modelName, params) {
//function ComponentGroupService(params) {
    ComponentGroupRepository.call(this, model, modelName, params);
    this.layerName = 'ComponentGroupService';
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

function inheritPrototype(ComponentGroupService, ComponentGroupRepository) {
    var prototype = Object.create(ComponentGroupRepository.prototype); // Create Object
    prototype.constructor = ComponentGroupService; // Augment Object
    ComponentGroupService.prototype = prototype; // Assign Object
}

inheritPrototype(ComponentGroupService, ComponentGroupRepository);

module.exports = ComponentGroupService;
