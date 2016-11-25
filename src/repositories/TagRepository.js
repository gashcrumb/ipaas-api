// Tag Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function TagRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models();

  this.layerName = 'TagRepository';
  this.model = Model.Tag;
  this.modelName = 'Tag';
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

extend(TagRepository, BaseRepository);

module.exports = TagRepository;
