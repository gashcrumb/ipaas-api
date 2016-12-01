// Config Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');

var async = require('async');
var ConfigRepository = require('../repositories/ConfigRepository.js');
var ConfigGroupRepository = require('../repositories/ConfigGroupRepository.js');
var ConfigTypeRepository = require('../repositories/ConfigTypeRepository.js');


// ---------------------- Class/Constructor ---->>

function ConfigService(model, modelName, params) {
    ConfigRepository.call(this, model, modelName, params);
    this.layerName = 'ConfigService';
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

function inheritPrototype(ConfigService, ConfigRepository) {
    var prototype = Object.create(ConfigRepository.prototype); // Create Object
    prototype.constructor = ConfigService; // Augment Object
    ConfigService.prototype = prototype; // Assign Object
}

inheritPrototype(ConfigService, ConfigRepository);

// Find One Instance with its Associations
ConfigService.prototype.findWithAssociations = function findWithAssociations(superDone) {
    this.find(function(instance) {
        var cleanObject = JSON.parse(JSON.stringify(instance));

        async.parallel([
            function(callback) {
                // ConfigGroups
                instance
                    .getConfigGroup()
                    .success(function(configGroup) {
                        if (configGroup) {cleanObject.configGroup = configGroup;}
                        callback(null, configGroup);
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

ConfigService.prototype.fetchAllWithAssociations = function fetchAssociations(done) {
    var self = this;
    // Get All ConfigTypes
    new ConfigGroupRepository().findAll(function(types) {
        var typeArray = [];
        _(types).forEach(function(type) {
            var params = {where: {ConfigTypeId: type.id}};
            new ConfigService(params).findAll(function(groupResults) {
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
ConfigService.prototype.setAssociations = function setAssociations(original, superDone) {
    var that = this;

    async.parallel({
        configGroups: function(callback) {
            if(that.params.associations.ConfigGroupId) {
                var ConfigGroupService = require('./ConfigGroupService.js');
                new ConfigGroupService({id: that.params.associations.ConfigGroupId}).find(function(configGroup) {
                    original
                        .setConfigGroup(configGroup)
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

module.exports = ConfigService;
