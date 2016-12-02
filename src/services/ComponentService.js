// Component Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');

var async = require('async');
var ComponentRepository = require('../repositories/ComponentRepository.js');
var ComponentGroupRepository = require('../repositories/ComponentGroupRepository.js');
var ComponentTypeRepository = require('../repositories/ComponentTypeRepository.js');


// ---------------------- Class/Constructor ---->>

function ComponentService(model, modelName, params) {
    ComponentRepository.call(this, model, modelName, params);
    this.layerName = 'ComponentService';
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

function inheritPrototype(ComponentService, ComponentRepository) {
    var prototype = Object.create(ComponentRepository.prototype); // Create Object
    prototype.constructor = ComponentService; // Augment Object
    ComponentService.prototype = prototype; // Assign Object
}

inheritPrototype(ComponentService, ComponentRepository);

// Find One Instance with its Associations
ComponentService.prototype.findWithAssociations = function findWithAssociations(superDone) {
    this.find(function(instance) {
        var cleanObject = JSON.parse(JSON.stringify(instance));

        async.parallel([
            function(callback) {
                // ComponentGroups
                instance
                    .getComponentGroup()
                    .success(function(componentGroup) {
                        if (componentGroup) {cleanObject.componentGroup = componentGroup;}
                        callback(null, componentGroup);
                    })
                    .error(function(err) {
                        callback(err);
                    });
            },
            function(callback) {
                // Users
                instance
                    .getUser()
                    .success(function(user) {
                        if (user) {cleanObject.user = user;}
                        callback(null, user);
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

ComponentService.prototype.fetchAllWithAssociations = function fetchAssociations(done) {
    var self = this;
    // Get All ComponentTypes
    new ComponentGroupRepository().findAll(function(types) {
        var typeArray = [];
        _(types).forEach(function(type) {
            var params = {where: {ComponentTypeId: type.id}};
            new ComponentService(params).findAll(function(groupResults) {
                var cake = self.mix(
                    {groupList: groupResults},
                    {type: type}
                );
                typeArray.push(cake);
            });
        });
        setTimeout(function() {
            if (done && typeof(done) === "function") {
                done(typeArray);
            }
        }, 3000);
    });
};


// Set Associations
ComponentService.prototype.setAssociations = function setAssociations(original, superDone) {
    var that = this;

    async.parallel({
        componentGroups: function(callback) {
            if(that.params.associations.ComponentGroupId) {
                var ComponentGroupService = require('./ComponentGroupService.js');
                new ComponentGroupService({id: that.params.associations.ComponentGroupId}).find(function(componentGroup) {
                    original
                        .setComponentGroup(componentGroup)
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
            if(that.params.associations.UserId) {
                var UserService = require('./UserService.js');
                new UserService({id: that.params.associations.UserId}).find(function(user) {
                    original
                        .setUser(user)
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

module.exports = ComponentService;
