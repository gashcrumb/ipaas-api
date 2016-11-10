// User Service
'use strict';

// ---------------------- Dependencies ---->>

var _ = require('lodash');
var async = require('async');
var UserRepository = require('../repositories/UserRepository.js');


// ---------------------- Class/Constructor ---->>

function UserService(model, modelName, params) {
  UserRepository.call(this, model, modelName, params);

  this.layerName = 'UserService';

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
  };
}

// ---------------------- Prototypes ---->>

function inheritPrototype(UserService, UserRepository) {
  var prototype = Object.create(UserRepository.prototype); // Create Object
  prototype.constructor = UserService; // Augment Object
  UserService.prototype = prototype; // Assign Object
}

inheritPrototype(UserService, UserRepository);

// Destroy Associations
UserService.prototype.destroyAssociations = function destroyAssociations(done) {
  var self = this;
};

// Find All Users and Fetch Associations
/*
 UserService.prototype.findAllWithAssociations = function findAllWithAssociations(done) {
 var self = this;
 // Get All Associations
 this.findAll(function(users) {
 var usersArray = [];
 _(users).forEach(function(userObj) {
 var params = {where: {id: userObj.id}};
 new UserService(params).findAll(function(userResults) {
 var cake = self.mix(
 {userList: userResults},
 {type: type}
 );
 usersArray.push(cake);
 });
 });
 setTimeout(function() {
 if (done && typeof(done) === "function") {
 done(usersArray);
 }
 }, 3000);
 });
 };
 */

// Find One User with All Associations
/*
 UserService.prototype.findWithAssociations = function findWithAssociations(superDone) {
 // Get All Associations
 this.find(function(userObj) {
 var cleanUser = JSON.parse(JSON.stringify(userObj));

 async.parallel([
 function(callback) {
 // Addresses
 userObj.getAddresses().success(function(addresses) {
 if (addresses) {cleanUser.addresses = addresses;}
 callback(null, addresses);
 });
 },
 function(callback) {
 // Campaigns
 userObj.getCampaigns().success(function(campaigns) {
 if (campaigns) {cleanUser.campaigns = campaigns;}
 callback(null, campaigns);
 });
 },
 function(callback) {
 // Carts
 userObj.getCarts().success(function(carts) {
 if (carts) {cleanUser.carts = carts;}
 callback(null, carts);
 });
 },
 function(callback) {
 // Comments
 userObj.getComments().success(function(comments) {
 if (comments) {cleanUser.comments = comments;}
 callback(null, comments);
 });
 },
 function(callback) {
 // Companies
 userObj.getCompanies().success(function(companies) {
 if (companies) {cleanUser.companies = companies;}
 callback(null, companies);
 });
 },
 function(callback) {
 // Configs
 userObj.getConfigs().success(function(configs) {
 if (configs) {cleanUser.configs = configs;}
 callback(null, configs);
 });
 },
 function(callback) {
 // Files
 userObj.getFiles({order: 'createdAt DESC'}).success(function(files) {
 if (files) {cleanUser.files = files;}
 callback(null, files);
 });
 },
 function(callback) {
 // History
 userObj.getHistories({order: 'createdAt DESC'}).success(function(history) {
 if (history) {cleanUser.history = history;}
 callback(null, history);
 });
 },
 function(callback) {
 // Images
 userObj.getImages({order: 'createdAt DESC'}).success(function(images) {
 if (images) {cleanUser.images = images;}
 callback(null, images);
 });
 },
 function(callback) {
 // Notes
 userObj.getNotes({order: 'createdAt DESC'}).success(function(notes) {
 if (notes) {cleanUser.notes = notes;}
 callback(null, notes);
 });
 },
 function(callback) {
 // Orders
 userObj.getOrders({order: 'createdAt DESC'}).success(function(orders) {
 if (orders) {cleanUser.orders = orders;}
 callback(null, orders);
 });
 },
 function(callback) {
 // Pets
 userObj.getPets().success(function(pets) {
 if (pets) {cleanUser.pets = pets;}
 callback(null, pets);
 });
 },
 function(callback) {
 // Projects
 userObj.getProjects().success(function(projects) {
 if (projects) {cleanUser.projects = projects;}
 callback(null, projects);
 });
 },
 function(callback) {
 // Reviews
 userObj.getReviews().success(function(reviews) {
 if (reviews) {cleanUser.reviews = reviews;}
 callback(null, reviews);
 });
 },
 function(callback) {
 // Role
 userObj.getRole().success(function(role) {
 if (role) {cleanUser.role = role;}
 callback(null, role);
 });
 },
 function(callback) {
 // Tags
 userObj.getTags().success(function(tags) {
 if (tags) {cleanUser.tags = tags;}
 callback(null, tags);
 });
 },
 function(callback) {
 // Tasks
 userObj
 .getTasks({order: 'createdAt DESC'})
 .success(function(tasks) {
 cleanUser.tasks = tasks;
 callback(null, tasks);
 })
 .error(function(err) {
 console.log('Error: ' + err);
 callback(err);
 });
 },
 function(callback) {
 // Tickets
 userObj.getTickets({order: 'createdAt DESC'}).success(function(tickets) {
 if (tickets) {cleanUser.tickets = tickets;}
 callback(null, tickets);
 });
 },
 function(callback) {
 // Transactions
 userObj.getTransactions({order: 'createdAt DESC'}).success(function(transactions) {
 if (transactions) {cleanUser.transactions = transactions;}
 callback(null, transactions);
 });
 },
 function(callback) {
 // Wishlists
 userObj.getWishlists().success(function(wishlists) {
 if (wishlists) {cleanUser.wishlists = wishlists;}
 callback(null, wishlists);
 });
 }
 ], function(err, results) {
 if (!err) {
 setTimeout(function() {
 if (superDone && typeof(superDone) === "function") {
 superDone(cleanUser);
 }
 }, 1000);
 } else {
 if (superDone && typeof(superDone) === "function") {
 superDone(err);
 }
 }
 });
 });
 };
 */

// Set Associations
UserService.prototype.setAssociations = function setAssociations(original, superDone) {
  var that = this;
  var cleanObject = JSON.parse(JSON.stringify(original));

  async.parallel([
    function(callback) {
      // Addresses
      if (that.params.associations.AddressId) {
        var AddressService = require('./AddressService.js');
        new AddressService({id: that.params.associations.AddressId}).find(function(address) {
          original
            .addAddress(address)
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
    function(callback) {
      // Campaigns
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
    function(callback) {
      // Carts
      if (that.params.associations.CartId) {
        var CartService = require('./CartService.js');
        new CartService({id: that.params.associations.CartId}).find(function(cart) {
          original
            .setCart(cart)
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
    function(callback) {
      // Comments
      if (that.params.associations.CommentId) {
        var CommentService = require('./CommentService.js');
        new CommentService({id: that.params.associations.CommentId}).find(function(comment) {
          original
            .setComment(comment)
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
    function(callback) {
      // Companies
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
    function(callback) {
      // Configs
      if (that.params.associations.ConfigId) {
        var ConfigService = require('./ConfigService.js');
        new ConfigService({id: that.params.associations.ConfigId}).find(function(config) {
          original
            .setConfig(config)
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
    /*
     function(callback) {
     // Entries
     if(that.params.associations.EntryId) {
     var EntryService = require('./EntryService.js');
     new EntryService({id: that.params.associations.EntryId}).find(function(entry) {
     original
     .addEntry(entry)
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
     */
    function(callback) {
      // Files
      if (that.params.associations.FileId) {
        var FileService = require('./FileService.js');
        new FileService({id: that.params.associations.FileId}).find(function(file) {
          original
            .addFile(file)
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
    function(callback) {
      // History
      if (that.params.associations.HistoryId) {
        var HistoryService = require('./HistoryService.js');
        new HistoryService({id: that.params.associations.HistoryId}).find(function(history) {
          original
            .addHistory(history)
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
    function(callback) {
      // Images
      if (that.params.associations.ImageId) {
        var ImageService = require('./ImageService.js');
        new ImageService({id: that.params.associations.ImageId}).find(function(image) {
          original
            .addImage(image)
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
    function(callback) {
      // Notes
      if (that.params.associations.NoteId) {
        var NoteService = require('./NoteService.js');
        new NoteService({id: that.params.associations.NoteId}).find(function(note) {
          original
            .addNote(note)
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
    function(callback) {
      // Orders
      if (that.params.associations.OrderId) {
        var OrderService = require('./OrderService.js');
        new OrderService({id: that.params.associations.OrderId}).find(function(order) {
          original
            .addOrder(order)
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
    function(callback) {
      // Pets
      if (that.params.associations.PetId) {
        var PetService = require('./PetService.js');
        new PetService({id: that.params.associations.PetId}).find(function(pet) {
          original
            .addPet(pet)
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
    function(callback) {
      // Projects
      if (that.params.associations.ProjectId) {
        var ProjectService = require('./ProjectService.js');
        new ProjectService({id: that.params.associations.ProjectId}).find(function(project) {
          original
            .addProject(project)
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
    function(callback) {
      // Role
      if (that.params.associations.RoleId) {
        var RoleService = require('./RoleService.js');
        new RoleService({id: that.params.associations.RoleId}).find(function(role) {
          original
            .addRole(role)
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
    function(callback) {
      // Tags
      if (that.params.associations.TagId) {
        var TagService = require('./TagService.js');
        new TagService({id: that.params.associations.TagId}).find(function(tag) {
          original
            .addTag(tag)
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
    function(callback) {
      // Tasks
      if (that.params.associations.TaskId) {
        var TaskService = require('./TaskService.js');
        new TaskService({id: that.params.associations.TaskId}).find(function(task) {
          original
            .addTask(task)
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
    function(callback) {
      // Tickets
      if (that.params.associations.TicketId) {
        var TicketService = require('./TicketService.js');
        new TicketService({id: that.params.associations.TicketId}).find(function(ticket) {
          original
            .addTicket(ticket)
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
    function(callback) {
      // Transactions
      if (that.params.associations.TransactionId) {
        var TransactionService = require('./TransactionService.js');
        new TransactionService({id: that.params.associations.TransactionId}).find(function(transaction) {
          original
            .addTransaction(transaction)
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
    function(callback) {
      // Wishlists
      if (that.params.associations.WishlistId) {
        var WishlistService = require('./WishlistService.js');
        new WishlistService({id: that.params.associations.WishlistId}).find(function(wishlist) {
          original
            .addWishlist(wishlist)
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
  ], function(err, results) {
    if (!err) {
      setTimeout(function() {
        //console.log('results: ' + JSON.stringify(results));
        // Maybe we can use a mixin here, before returning the result
        if (superDone && typeof(superDone) === "function") {
          superDone(results);
        }
      }, 1000);
    } else {
      if (superDone && typeof(superDone) === "function") {
        superDone(err);
      }
    }
  });
};


// Unset Associations
UserService.prototype.unsetAssociations = function unsetAssociations(original, superDone) {
  //
};


module.exports = UserService;
