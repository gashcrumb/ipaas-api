// Role Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function RoleRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models().models;

  this.layerName = 'RoleRepository';
  this.model = Model.Role;
  this.modelName = 'Role';
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

extend(RoleRepository, BaseRepository);

module.exports = RoleRepository;
