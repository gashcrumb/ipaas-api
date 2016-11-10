// Report Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ReportRepository = require('../repositories/ReportRepository.js');


// ---------------------- Class/Constructor ---->>

function ReportService(model, modelName, params) {
  ReportRepository.call(this, model, modelName, params);
  this.layerName = 'ReportService';
  //this.params = params;
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
  }
}

// ---------------------- Prototypes ---->>

function inheritPrototype(ReportService, ReportRepository) {
  var prototype = Object.create(ReportRepository.prototype); // Create Object
  prototype.constructor = ReportService; // Augment Object
  ReportService.prototype = prototype; // Assign Object
}

inheritPrototype(ReportService, ReportRepository);


// Set Associations
ReportService.prototype.setAssociations = function setAssociations(original, superDone) {
  var that = this;

  async.parallel({
    users: function(callback) {
      if (that.params.associations.UserId) {
        var UserService = require('./UserService.js');
        new UserService({id: that.params.associations.UserId}).find(function(userObj) {
          original
            .setUser(userObj)
            .success(function() {
              callback(null);
            })
            .error(function(err) {
              callback(err);
            });
        });
      } else {
        callback(null);
      }
    }
  }, function(err, results) {
    if (!err) {
      setTimeout(function() {
        if (superDone && typeof(superDone) === "function") {
          superDone(results);
        }
        return results;
      }, 1000);
    } else {
      if (superDone && typeof(superDone) === "function") {
        superDone(err);
      }
    }
  });
};

module.exports = ReportService;
