// Config Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function ConfigRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models().models;

  this.layerName = 'ConfigRepository';
  this.model = Model.Config;
  this.modelName = 'Config';
  this.params = params;
}

// Inherit from BaseRepository
function extend(Child, Parent) {
  var F = function() {
  };
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

extend(ConfigRepository, BaseRepository);

module.exports = ConfigRepository;
