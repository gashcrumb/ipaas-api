// ConfigType Service
'use strict';

// ---------------------- Dependencies ---->>

var async = require('async');
var ConfigTypeRepository = require('../repositories/ConfigTypeRepository.js');


// ---------------------- Class/Constructor ---->>

function ConfigTypeService(model, modelName, params) {
    ConfigTypeRepository.call(this, model, modelName, params);
    this.layerName = 'ConfigTypeService';
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

function inheritPrototype(ConfigTypeService, ConfigTypeRepository) {
    var prototype = Object.create(ConfigTypeRepository.prototype); // Create Object
    prototype.constructor = ConfigTypeService; // Augment Object
    ConfigTypeService.prototype = prototype; // Assign Object
}

inheritPrototype(ConfigTypeService, ConfigTypeRepository);

// Find One Instance with its Associations
ConfigTypeService.prototype.findWithAssociations = function findWithAssociations(superDone) {
    this.find(function(instance) {
        var cleanObject = JSON.parse(JSON.stringify(instance));

        async.parallel([
            function(callback) {
                // ConfigGroups
                instance
                    .getConfigGroups()
                    .success(function(configGroups) {
                        if (configGroups) {cleanObject.configGroups = configGroups;}
                        callback(null, configGroups);
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
ConfigTypeService.prototype.setAssociations = function setAssociations(original, superDone) {
    var that = this;

    async.parallel({
        ConfigGroup: function(callback) {
            if(that.params.associations.ConfigGroupId) {
                var ConfigGroupService = require('./ConfigGroupService.js');
                new ConfigGroupService({id: that.params.associations.ConfigGroupId}).find(function(configGroup) {
                    original
                        .addConfigGroup(configGroup)
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

module.exports = ConfigTypeService;
