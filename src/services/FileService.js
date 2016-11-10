// File Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var FileRepository = require('../repositories/FileRepository.js');


// ---------------------- Class/Constructor ---->>

function FileService(model, modelName, params) {
  FileRepository.call(this, model, modelName, params);
  this.layerName = 'FileService';
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

function inheritPrototype(FileService, FileRepository) {
  var prototype = Object.create(FileRepository.prototype); // Create Object
  prototype.constructor = FileService; // Augment Object
  FileService.prototype = prototype; // Assign Object
}

inheritPrototype(FileService, FileRepository);

// Find One Instance with its Associations
FileService.prototype.findWithAssociations = function findWithAssociations(superDone) {
  this.find(function(instance) {
    var cleanObject = JSON.parse(JSON.stringify(instance));

    async.parallel([
      function(callback) {
        // Campaign
        instance
          .getCampaigns()
          .success(function(campaigns) {
            if (campaigns) {
              cleanObject.campaigns = campaigns;
            }
            callback(null, campaigns);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Company
        instance
          .getCompanies()
          .success(function(companies) {
            if (companies) {
              cleanObject.companies = companies;
            }
            callback(null, companies);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Product
        instance
          .getProducts()
          .success(function(products) {
            if (products) {
              cleanObject.products = products;
            }
            callback(null, products);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Project
        instance
          .getProjects()
          .success(function(projects) {
            if (projects) {
              cleanObject.projects = projects;
            }
            callback(null, projects);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Tickets
        instance
          .getTickets()
          .success(function(tickets) {
            if (tickets) {
              cleanObject.tickets = tickets;
            }
            callback(null, tickets);
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
FileService.prototype.setAssociations = function setAssociations(original, superDone) {
  var that = this;

  async.parallel({
    campaign: function(callback) {
      if (that.params.associations.CampaignId) {
        var CampaignService = require('./CampaignService.js');
        new CampaignService({id: that.params.associations.CampaignId}).find(function(campaignObj) {
          original
            .setCampaign(campaignObj)
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
    company: function(callback) {
      if (that.params.associations.CompanyId) {
        var CompanyService = require('./CompanyService.js');
        new CompanyService({id: that.params.associations.CompanyId}).find(function(companyObj) {
          original
            .setCompany(companyObj)
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
    products: function(callback) {
      if (that.params.associations.ProductId) {
        var ProductService = require('./ProductService.js');
        new ProductService({id: that.params.associations.ProductId}).find(function(productObj) {
          original
            .setProduct(productObj)
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
    projects: function(callback) {
      if (that.params.associations.ProjectId) {
        var ProjectService = require('./ProjectService.js');
        new ProjectService({id: that.params.associations.ProjectId}).find(function(projectObj) {
          original
            .setProject(projectObj)
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
    tickets: function(callback) {
      if (that.params.associations.TicketId) {
        var TicketService = require('./TicketService.js');
        new TicketService({id: that.params.associations.TicketId}).find(function(ticketObj) {
          original
            .setTicket(ticketObj)
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

module.exports = FileService;
