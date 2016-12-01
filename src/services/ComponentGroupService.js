// ConfigGroup Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ConfigGroupRepository = require('../repositories/ConfigGroupRepository.js');
var ConfigTypeRepository = require('../repositories/ConfigTypeRepository.js');
var UserRepository = require('../repositories/UserRepository.js');


// ---------------------- Class/Constructor ---->>

function ConfigGroupService(model, modelName, params) {
//function ConfigGroupService(params) {
    ConfigGroupRepository.call(this, model, modelName, params);
    this.layerName = 'ConfigGroupService';
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

function inheritPrototype(ConfigGroupService, ConfigGroupRepository) {
    var prototype = Object.create(ConfigGroupRepository.prototype); // Create Object
    prototype.constructor = ConfigGroupService; // Augment Object
    ConfigGroupService.prototype = prototype; // Assign Object
}

inheritPrototype(ConfigGroupService, ConfigGroupRepository);

// Find One Instance with its Associations
ConfigGroupService.prototype.findWithAssociations = function findWithAssociations(superDone) {
    this.find(function(instance) {
        var cleanObject = JSON.parse(JSON.stringify(instance));

        async.parallel([
            function(callback) {
                instance
                    .getConfigs()
                    .success(function(configs) {
                        if (configs) {cleanObject.configs = configs;}
                        callback(null, configs);
                    })
                    .error(function(err) {
                        callback(err);
                    });
            },
            function(callback) {
                instance
                    .getConfigTypes() // May actually be 'getConfigType()'
                    .success(function(configTypes) {
                        if (configTypes) {cleanObject.configTypes = configTypes;}
                        callback(null, configTypes);
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


ConfigGroupService.prototype.fetchAllWithAssociations = function fetchAssociations(done) {
    var self = this;
    // Get All ConfigTypes
    new ConfigTypeRepository().findAll(function(types) {
        var typeArray = [];
        _(types).forEach(function(type) {
            var params = {where: {ConfigTypeId: type.id}};
            new ConfigGroupService(params).findAll(function(groupResults) {
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
ConfigGroupService.prototype.setAssociations = function setAssociations(original, superDone) {
    var that = this;

    async.parallel({
        configs: function(callback) {
            if(that.params.associations.ConfigId) {
                var ConfigService = require('./ConfigService.js');
                new ConfigService({id: that.params.associations.ConfigId}).find(function(config) {
                    original
                        .addConfig(config)
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
        configTypes: function(callback) {
            if(that.params.associations.ConfigTypeId) {
                var ConfigTypeService = require('./ConfigTypeService.js');
                new ConfigTypeService({id: that.params.associations.ConfigTypeId}).find(function(configType) {
                    original
                        .setConfigType(configType)
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

module.exports = ConfigGroupService;
