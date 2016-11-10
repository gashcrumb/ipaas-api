// History Service
'use strict';

// ---------------------- Dependencies ---->>


var async = require('async');
var HistoryRepository = require('../repositories/HistoryRepository.js');


// ---------------------- Class/Constructor ---->>

function HistoryService(model, modelName, params) {
  HistoryRepository.call(this, model, modelName, params);
  this.layerName = 'HistoryService';
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

function inheritPrototype(HistoryService, HistoryRepository) {
  var prototype = Object.create(HistoryRepository.prototype); // Create Object
  prototype.constructor = HistoryService; // Augment Object
  HistoryService.prototype = prototype; // Assign Object
}

inheritPrototype(HistoryService, HistoryRepository);


// Find One Instance with its Associations
HistoryService.prototype.findWithAssociations = function findWithAssociations(superDone) {
  this.find(function(instance) {
    var cleanObject = JSON.parse(JSON.stringify(instance));

    async.parallel([
      function(callback) {
        // Users
        instance
          .getUsers()
          .success(function(users) {
            if (users) {
              cleanObject.users = users;
            }
            callback(null, users);
          })
          .error(function(err) {
            callback(err);
          });
      }
    ], function(err, results) {
      if (!err) {
        setTimeout(function() {
          if (superDone && typeof(superDone) === "function") {
            superDone(cleanObject);
          }
        }, 500);
      } else {
        if (superDone && typeof(superDone) === "function") {
          superDone(err);
        }
      }
    });
  });
};

// Set Associations
HistoryService.prototype.setAssociations = function setAssociations(original, superDone) {
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

module.exports = HistoryService;
