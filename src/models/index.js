// Models

// ---------------------- Dependencies & Setup ---->>

var Sequelize = require('sequelize');

//console.log('Initializing database connection with Sequelize...');

var app = require('../../server.js');
var config = require('../../config/' + app.get('env') + '.json');
var db = {};
var fs = require('fs');
var path = require('path');


// ---------------------- Database Initialization ---->>

var sequelize = new Sequelize(config['db']['database'], config['db']['username'], config['db']['password'], config['db']['options']);


// ---------------------- Models ---->>


var models = {};
db.sequelize = sequelize;

function Models() {
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
          db[model.name] = model;
        });

    });

    setTimeout(function() {
      Object.keys(models).forEach(function(modelName) {
        if ('associate' in models[modelName]) {
          db[modelName].associate(models);
        }
      });
    }, 2000);

  }

  return db;
}

module.exports = Models;

// Export Individual Database Connections
exports.sequelize = sequelize;
