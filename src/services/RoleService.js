// Role Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var RoleRepository = require('../repositories/RoleRepository.js');


// ---------------------- Class/Constructor ---->>

function RoleService(model, modelName, params) {
  RoleRepository.call(this, model, modelName, params);
  this.layerName = 'RoleService';
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

function inheritPrototype(RoleService, RoleRepository) {
  var prototype = Object.create(RoleRepository.prototype); // Create Object
  prototype.constructor = RoleService; // Augment Object
  RoleService.prototype = prototype; // Assign Object
}

inheritPrototype(RoleService, RoleRepository);

// Find One Instance with its Associations
RoleService.prototype.findWithAssociations = function findWithAssociations(superDone) {
  this.find(function(instance) {
    var cleanObject = JSON.parse(JSON.stringify(instance));

    async.parallel([
      function(callback) {
        // Permissions
        instance
          .getPermissions()
          .success(function(permissions) {
            if (permissions) {
              cleanObject.permissions = permissions;
            }
            callback(null, permissions);
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
RoleService.prototype.setAssociations = function setAssociations(original, superDone) {
  var that = this;

  async.parallel({
    permissions: function(callback) {
      if (that.params.associations.PermissionId) {
        var PermissionService = require('./PermissionService.js');
        new PermissionService({id: that.params.associations.PermissionId}).find(function(permissionObj) {
          original
            .addPermission(permissionObj)
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
            .addUser(userObj)
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

module.exports = RoleService;
