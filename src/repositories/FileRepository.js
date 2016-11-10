// File Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function FileRepository(params) {
  // Instantiate new Models Layer
  var Model = new Models();

  this.layerName = 'FileRepository';
  this.model = Model.File;
  this.modelName = 'File';
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

extend(FileRepository, BaseRepository);

module.exports = FileRepository;
