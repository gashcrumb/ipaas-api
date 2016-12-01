// IntegrationPattern Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function IntegrationPatternRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models().models;

  this.layerName = 'IntegrationPatternRepository';
  this.model = Model.IntegrationPattern;
  this.modelName = 'IntegrationPattern';
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

extend(IntegrationPatternRepository, BaseRepository);

module.exports = IntegrationPatternRepository;
