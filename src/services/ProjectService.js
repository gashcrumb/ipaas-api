// Project Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ProjectRepository = require('../repositories/ProjectRepository.js');


// ---------------------- Class/Constructor ---->>

function ProjectService(model, modelName, params) {
  ProjectRepository.call(this, model, modelName, params);

  this.layerName = 'ProjectService';

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

function inheritPrototype(ProjectService, ProjectRepository) {
  var prototype = Object.create(ProjectRepository.prototype); // Create Object
  prototype.constructor = ProjectService; // Augment Object
  ProjectService.prototype = prototype; // Assign Object
}

inheritPrototype(ProjectService, ProjectRepository);

module.exports = ProjectService;
