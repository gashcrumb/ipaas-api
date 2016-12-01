// IntegrationPatternGroup Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function IntegrationPatternGroupRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models().models;

  this.layerName = 'IntegrationPatternGroupRepository';
  this.model = Model.IntegrationPatternGroup;
  this.modelName = 'IntegrationPatternGroup';
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

extend(IntegrationPatternGroupRepository, BaseRepository);

module.exports = IntegrationPatternGroupRepository;
