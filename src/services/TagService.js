// Tag Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var TagRepository = require('../repositories/TagRepository.js');


// ---------------------- Class/Constructor ---->>

function TagService(model, modelName, params) {
  TagRepository.call(this, model, modelName, params);

  this.layerName = 'TagService';

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
  };
}

// ---------------------- Prototypes ---->>

function inheritPrototype(TagService, TagRepository) {
  var prototype = Object.create(TagRepository.prototype); // Create Object
  prototype.constructor = TagService; // Augment Object
  TagService.prototype = prototype; // Assign Object
}

inheritPrototype(TagService, TagRepository);

module.exports = TagService;
