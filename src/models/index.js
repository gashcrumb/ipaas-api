// Models

// ---------------------- Dependencies & Setup ---->>

const Sequelize = require('sequelize');
const _ = require('lodash');

//console.log('Initializing database connection with Sequelize...');

const app = require('../../app.js');
const config = require('../../config/' + app.get('env') + '.json');
const db = {
  initialized: false,
  lookupTable: {}
};
const fs = require('fs');
const path = require('path');


// ---------------------- Database Initialization ---->>

const sequelize = new Sequelize(config['db']['database'], config['db']['username'], config['db']['password'], config['db']['options']);


// ---------------------- Models ---->>
const models = {};

db.models = models;
db.sequelize = sequelize;

function Models() {
  if (db.initialized) {
    return db;
  }
  if (config['orm'] == 'Sequelize') {

    function getDirectories(srcpath) {
      return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
      });
    }

    getDirectories(__dirname).map(function(eachDir) {
      // console.log('Directory: ' + JSON.stringify(eachDir));

      // Importing models via Sequelize

      fs
        .readdirSync(path.join(__dirname, eachDir))
        .filter(function(file) {
          // Check for ORM-specific file
          return (file.indexOf(config['orm'].toLowerCase() + '.js') === 0) && (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function(file) {
          // console.log('File: ' + JSON.stringify(file));

          var model = sequelize.import(path.join(__dirname, eachDir, file));
          models[model.name] = model;
          db.lookupTable[model.name.toLowerCase()] = model.name;
        });
    });

    console.log('Models: ', models);

    // First create all of the model associations
    _.forOwn(models, function (model, name) {
      if ('associate' in model) {
        console.log('Calling associate for model: ', name);
        model.associate(models);
      }
    });

    // Synchronize all associations to the DB
    _.forOwn(models, function (model, name) {
      model.sync().then(function() {
        console.log(name + ' synced');
      });
    });
  }
  db.initialized = true;
  return db;
}

module.exports = Models;

// Export Individual Database Connections
// exports.sequelize = sequelize;
