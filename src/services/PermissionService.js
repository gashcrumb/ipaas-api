// Permission Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var PermissionRepository = require('../repositories/PermissionRepository.js');


// ---------------------- Class/Constructor ---->>

function PermissionService(model, modelName, params) {
  PermissionRepository.call(this, model, modelName, params);
  this.layerName = 'PermissionService';
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

function inheritPrototype(PermissionService, PermissionRepository) {
  var prototype = Object.create(PermissionRepository.prototype); // Create Object
  prototype.constructor = PermissionService; // Augment Object
  PermissionService.prototype = prototype; // Assign Object
}

inheritPrototype(PermissionService, PermissionRepository);

// Find One Instance with its Associations
PermissionService.prototype.findWithAssociations = function findWithAssociations(superDone) {
  this.find(function(instance) {
    var cleanObject = JSON.parse(JSON.stringify(instance));

    async.parallel([
      function(callback) {
        // Role
        instance
          .getRole()
          .success(function(role) {
            if (role) {
              cleanObject.role = role;
            }
            callback(null, role);
          })
          .error(function(err) {
            callback(err);
          });
      },
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
PermissionService.prototype.setAssociations = function setAssociations(original, superDone) {
  var that = this;

  async.parallel({
    role: function(callback) {
      if (that.params.associations.RoleId) {
        var RoleService = require('./RoleService.js');
        new RoleService({id: that.params.associations.RoleId}).find(function(roleObj) {
          original
            .setRole(roleObj)
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
    },
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

module.exports = PermissionService;
