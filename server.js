// API Server

// ---------------------- Dependencies ---->>
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');


// ---------------------- Other Initialization Tasks ---->>
const app = module.exports = require(__dirname + '/app.js');
const router = express.Router();
const routes = require('./router.js');
const config = require(__dirname + '/config/' + app.get('env') + '.json');
const sequelizeFixtures = require('sequelize-fixtures');

const Models = require(__dirname + '/src/models/index.js');
const models = new Models();


// ---------------------- Express ---->>
app.set('title', config['settings']['title']);
app.set('port', process.env.PORT || config['settings']['port']);
app.enable('trust proxy');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('connect-multiparty')());
app.use(methodOverride());

// Handle CORS
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,X-Requested-With');

  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
app.all('/v1/*', [require(__dirname + '/src/api/middlewares/validateRequest')]);


// Set up Routes
routes(router, app);
app.use(router);


// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// ---------------------- Start Up Server ---->>
app.listen(app.get('port'), function() {

  // Synchronize Models & Initialize Connection

  models.sequelize.sync({ force: true }).then(function() {
    console.log('Database successfully synced.');

    // Seed the database if you configure it to.
    // You can easily change the JSON seed file in /config/{your environment}.json
    // under `db.options.seederStoragePath`.
    // This file is usually located in /src/data/fixtures/{name}.json
    if(config['db']['options']['seedDataOnInit'] === true) {
      sequelizeFixtures.loadFile(path.join(__dirname + '/src/data/fixtures/', config['db']['options']['seederStoragePath']), models).then(function() {
        console.log('Database successfully seeded with dummy data.');
      });
    }

    return console.log(config['settings']['title'] + ' is listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
  });
});


