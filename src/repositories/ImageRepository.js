// Image Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function ImageRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models();

  this.layerName = 'ImageRepository';
  this.model = Model.Image;
  this.modelName = 'Image';
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

extend(ImageRepository, BaseRepository);

module.exports = ImageRepository;
