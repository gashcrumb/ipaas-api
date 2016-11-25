// Router
'use strict';

module.exports = exports.router = function Route(router, app) {
  var config = require('./config/' + app.get('env') + '.json');
  var path = require('path');
  var prefix = './src/api/';

  // API / Data / Actions
  var api = {
    configs: require('./src/api/configs.js'),
    configGroups: require('./src/api/configGroups.js'),
    configTypes: require('./src/api/configTypes.js'),
    connections: require('./src/api/connections.js'),
    connectionTypes: require('./src/api/connectionTypes.js'),
    environments: require('./src/api/environments.js'),
    environmentTypes: require('./src/api/environmentTypes.js'),
    integrationRuntimes: require('./src/api/integrationRuntimes.js'),
    integrations: require('./src/api/integrations.js'),
    integrationTemplates: require('./src/api/integrationTemplates'),
    organizations: require('./src/api/organizations.js'),
    steps: require('./src/api/steps.js'),
    stepTypes: require('./src/api/stepTypes.js'),
    tags: require('./src/api/tags.js'),
    users: require('./src/api/users.js')
  };

  var auth = require('./src/api/auth.js');

  // Check if user is logged in
  var checkAuth = function(req, res, next) {
    if (config['admin']['login'] === 'off') {
      next();
    } else {
      if (req.loggedIn) {
        next();
      } else {
        console.log('User is not logged in. Redirecting to login...');
        res.render('login');
      }
    }
  };

  // Check if user role is admin
  var checkAdmin = function(req, res, next) {
    if (req.user.role == 'Admin') {
      return next();
    } else {
      console.log('User is not an Admin. Redirecting to restricted error...');
      return res.render('error');
    }
  };

  router.get('/', function(req, res) {
    res.send('Hello world!');
  });


  // Authentication & ACL

  //router.get('/logout', routes.main.logout);

  //router.all('*', checkAuth);

  // Routes that can be accessed by any one
  router.post('/login', auth.login);


  // ---------------------- API ---->>

  //router.all('/v1/*', checkAdmin);
  
  // Connections
  router.get('/v1/connections', api.connections.findAll);
  router.get('/v1/connections/:id', api.connections.find);
  router.post('/v1/connections', api.connections.add);
  router.put('/v1/connections/:id', api.connections.save);
  router.delete('/v1/connections/:id', api.connections.del);

  // Connection Types
  router.get('/v1/connection-types', api.connectionTypes.findAll);
  router.get('/v1/connection-types/:id', api.connectionTypes.find);
  router.post('/v1/connection-types', api.connectionTypes.add);
  router.put('/v1/connection-types/:id', api.connectionTypes.save);
  router.delete('/v1/connection-types/:id', api.connectionTypes.del);

  // Environments
  router.get('/v1/environments', api.environments.findAll);
  router.get('/v1/environments/:id', api.environments.find);
  router.post('/v1/environments', api.environments.add);
  router.put('/v1/environments/:id', api.environments.save);
  router.delete('/v1/environments/:id', api.environments.del);

  // Environment Types
  router.get('/v1/environment-types', api.environmentTypes.findAll);
  router.get('/v1/environment-types/:id', api.environmentTypes.find);
  router.post('/v1/environment-types', api.environmentTypes.add);
  router.put('/v1/environment-types/:id', api.environmentTypes.save);
  router.delete('/v1/environment-types/:id', api.environmentTypes.del);

  // Integrations
  router.get('/v1/integrations', api.integrations.findAll);
  router.get('/v1/integrations/:id', api.integrations.find);
  router.post('/v1/integrations', api.integrations.add);
  router.put('/v1/integrations/:id', api.integrations.save);
  router.delete('/v1/integrations/:id', api.integrations.del);

  // Integration Runtimes
  router.get('/v1/integration-runtimes', api.integrationRuntimes.findAll);
  router.get('/v1/integration-runtimes/:id', api.integrationRuntimes.find);
  router.post('/v1/integration-runtimes', api.integrationRuntimes.add);
  router.put('/v1/integration-runtimes/:id', api.integrationRuntimes.save);
  router.delete('/v1/integration-runtimes/:id', api.integrationRuntimes.del);

  // Integration Templates
  router.get('/v1/integration-templates', api.integrationTemplates.findAll);
  router.get('/v1/integration-templates/:id', api.integrationTemplates.find);
  router.post('/v1/integration-templates', api.integrationTemplates.add);
  router.put('/v1/integration-templates/:id', api.integrationTemplates.save);
  router.delete('/v1/integration-templates/:id', api.integrationTemplates.del);

  // Organizations
  router.get('/v1/organizations', api.organizations.findAll);
  router.get('/v1/organizations/:id', api.organizations.find);
  router.post('/v1/organizations', api.organizations.add);
  router.put('/v1/organizations/:id', api.organizations.save);
  router.delete('/v1/organizations/:id', api.organizations.del);

  // Steps
  router.get('/v1/steps', api.steps.findAll);
  router.get('/v1/steps/:id', api.steps.find);
  router.post('/v1/steps', api.steps.add);
  router.put('/v1/steps/:id', api.steps.save);
  router.delete('/v1/steps/:id', api.steps.del);

  // Step Types
  router.get('/v1/step-types', api.stepTypes.findAll);
  router.get('/v1/step-types/:id', api.stepTypes.find);
  router.post('/v1/step-types', api.stepTypes.add);
  router.put('/v1/step-types/:id', api.stepTypes.save);
  router.delete('/v1/step-types/:id', api.stepTypes.del);

  // Tags
  router.get('/v1/tags', api.tags.findAll);
  router.get('/v1/tags/:id', api.tags.find);
  router.post('/v1/tags', api.tags.add);
  router.put('/v1/tags/:id', api.tags.save);
  router.delete('/v1/tags/:id', api.tags.del);

  // Users
  router.get('/v1/users', api.users.findAll);
  router.get('/v1/users/:id', api.users.find);
  router.post('/v1/users', api.users.add);
  router.put('/v1/users/:id', api.users.save);
  router.delete('/v1/users/:id', api.users.del);
  
};
