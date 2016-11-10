// Image Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var ImageRepository = require('../repositories/ImageRepository.js');


// ---------------------- Class/Constructor ---->>

function ImageService(model, modelName, params) {
  ImageRepository.call(this, model, modelName, params);
  this.layerName = 'ImageService';
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

function inheritPrototype(ImageService, ImageRepository) {
  var prototype = Object.create(ImageRepository.prototype); // Create Object
  prototype.constructor = ImageService; // Augment Object
  ImageService.prototype = prototype; // Assign Object
}

inheritPrototype(ImageService, ImageRepository);

// Find One Instance with its Associations
ImageService.prototype.findWithAssociations = function findWithAssociations(superDone) {
  this.find(function(instance) {
    var cleanObject = JSON.parse(JSON.stringify(instance));

    async.parallel([
      function(callback) {
        // Campaigns
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
        // Categories
        instance
          .getCategories()
          .success(function(categories) {
            if (categories) {
              cleanObject.categories = categories;
            }
            callback(null, categories);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Companies
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
        // Notes
        instance
          .getNotes()
          .success(function(notes) {
            if (notes) {
              cleanObject.notes = notes;
            }
            callback(null, notes);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Pets
        instance
          .getPets()
          .success(function(pets) {
            if (pets) {
              cleanObject.pets = pets;
            }
            callback(null, pets);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Products
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
        // Projects
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
        // Reviews
        instance
          .getReviews()
          .success(function(reviews) {
            if (reviews) {
              cleanObject.reviews = reviews;
            }
            callback(null, reviews);
          })
          .error(function(err) {
            callback(err);
          });
      },
      function(callback) {
        // Tasks
        instance
          .getTasks()
          .success(function(tasks) {
            if (tasks) {
              cleanObject.tasks = tasks;
            }
            callback(null, tasks);
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
ImageService.prototype.setAssociations = function setAssociations(original, superDone) {
  var that = this;

  async.parallel({
    campaigns: function(callback) {
      if (that.params.associations.CampaignId) {
        var CampaignService = require('./CampaignService.js');
        new CampaignService({id: that.params.associations.CampaignId}).find(function(campaign) {
          original
            .setCampaign(campaign)
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
    categories: function(callback) {
      if (that.params.associations.CategoryId) {
        var CategoryService = require('./CategoryService.js');
        new CategoryService({id: that.params.associations.CategoryId}).find(function(category) {
          original
            .setCategory(category)
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
    companies: function(callback) {
      if (that.params.associations.CompanyId) {
        var CompanyService = require('./CompanyService.js');
        new CompanyService({id: that.params.associations.CompanyId}).find(function(company) {
          original
            .setCompany(company)
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
    notes: function(callback) {
      if (that.params.associations.NoteId) {
        var NoteService = require('./NoteService.js');
        new NoteService({id: that.params.associations.NoteId}).find(function(note) {
          original
            .setNote(note)
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
    pets: function(callback) {
      if (that.params.associations.PetId) {
        var PetService = require('./PetService.js');
        new PetService({id: that.params.associations.PetId}).find(function(pet) {
          original
            .setPet(pet)
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
        new ProductService({id: that.params.associations.ProductId}).find(function(product) {
          original
            .setProduct(product)
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
    reviews: function(callback) {
      if (that.params.associations.ReviewId) {
        var ReviewService = require('./ReviewService.js');
        new ReviewService({id: that.params.associations.ReviewId}).find(function(review) {
          original
            .setReview(review)
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
    tasks: function(callback) {
      if (that.params.associations.TaskId) {
        var TaskService = require('./TaskService.js');
        new TaskService({id: that.params.associations.TaskId}).find(function(task) {
          original
            .setTask(task)
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

module.exports = ImageService;
