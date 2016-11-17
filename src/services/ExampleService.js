// Example Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ExampleRepository = require('../repositories/ExampleRepository.js');


// ---------------------- Class/Constructor ---->>

function ExampleService(model, modelName, params) {
  ExampleRepository.call(this, model, modelName, params);
  this.layerName = 'ExampleService';
}

// ---------------------- Prototypes ---->>

function inheritPrototype(ExampleService, ExampleRepository) {
  var prototype = Object.create(ExampleRepository.prototype); // Create Object
  prototype.constructor = ExampleService; // Augment Object
  ExampleService.prototype = prototype; // Assign Object
}

inheritPrototype(ExampleService, ExampleRepository);

// An example of the custom methods you can create for this particular model, while still inheriting
// the traditional methods all other models get from the BaseService (which basically inherits its
// methods from the BaseRepository).
ExampleService.prototype.createDogWithoutTail = function createDogWithoutTail() {
  // Do stuff here
};


module.exports = ExampleService;
