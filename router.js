// Router
'use strict';

module.exports = exports.router = function Route(router, app) {
  var config = require('./config/' + app.get('env') + '.json');
  var path = require('path');
  //var prefix = './src/api/';

  // API / Data / Actions
  var api = {
    components: require('./src/api/components.js'),
    componentGroups: require('./src/api/componentGroups.js'),
    configs: require('./src/api/configs.js'),
    configGroups: require('./src/api/configGroups.js'),
    configTypes: require('./src/api/configTypes.js'),
    connections: require('./src/api/connections.js'),
    environments: require('./src/api/environments.js'),
    environmentTypes: require('./src/api/environmentTypes.js'),
    integrations: require('./src/api/integrations.js'),
    integrationPatterns: require('./src/api/integrationPatterns.js'),
    integrationRuntimes: require('./src/api/integrationRuntimes.js'),
    integrationTemplates: require('./src/api/integrationTemplates.js'),
    organizations: require('./src/api/organizations.js'),
    permissions: require('./src/api/permissions.js'),
    reports: require('./src/api/reports.js'),
    roles: require('./src/api/roles.js'),
    steps: require('./src/api/steps.js'),
    tags: require('./src/api/tags.js'),
    users: require('./src/api/users.js')
  };

  var auth = require('./src/api/auth.js');

  // Check if user is logged in
  var checkAuth = function(req, res, next) {
    if (config['requireLogin'] === false) {
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
  //router.post('/login', auth.login);


  // ---------------------- API ---->>

  //router.all('/v1/*', checkAdmin);

  // Components
  router.get('/v1/components', api.component.findAll);
  router.get('/v1/components/:id', api.component.find);
  router.post('/v1/components', api.component.add);
  router.put('/v1/components/:id', api.component.save);
  router.delete('/v1/components/:id', api.component.del);

  // Component Groups
  router.get('/v1/component-groups', api.componentGroups.findAll);
  router.get('/v1/component-groups/:id', api.componentGroups.find);
  router.post('/v1/component-groups', api.componentGroups.add);
  router.put('/v1/component-groups/:id', api.componentGroups.save);
  router.delete('/v1/component-groups/:id', api.componentGroups.del);

  // ConfigGroups
  router.get('/v1/config-groups', api.configGroups.findAll);
  router.get('/v1/config-groups/:id', api.configGroups.find);
  router.post('/v1/config-groups', api.configGroups.add);
  router.put('/v1/config-groups/:id', api.configGroups.save);
  router.delete('/v1/config-groups/:id', api.configGroups.del);

  // Configs
  router.get('/v1/configs', api.configs.findAll);
  router.get('/v1/configs/:id', api.configs.find);
  router.post('/v1/configs', api.configs.add);
  router.put('/v1/configs/:id', api.configs.save);
  router.delete('/v1/configs/:id', api.configs.del);

  // ConfigTypes
  router.get('/v1/config-types', api.configTypes.findAll);
  router.get('/v1/config-types/:id', api.configTypes.find);
  router.post('/v1/config-types', api.configTypes.add);
  router.put('/v1/config-types/:id', api.configTypes.save);
  router.delete('/v1/config-types/:id', api.configTypes.del);

  // Connections
  router.get('/v1/connections', api.connections.findAll);
  router.get('/v1/connections/:id', api.connections.find);
  router.post('/v1/connections', api.connections.add);
  router.put('/v1/connections/:id', api.connections.save);
  router.delete('/v1/connections/:id', api.connections.del);

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
  
  // Integration Patterns
  router.get('/v1/integration-patterns', api.integrationPatterns.findAll);
  router.get('/v1/integration-patterns/:id', api.integrationPatterns.find);
  router.post('/v1/integration-patterns', api.integrationPatterns.add);
  router.put('/v1/integration-patterns/:id', api.integrationPatterns.save);
  router.delete('/v1/integration-patterns/:id', api.integrationPatterns.del);

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

  // Permissions
  router.get('/v1/permissions', api.permissions.findAll);
  router.get('/v1/permissions/:id', api.permissions.find);
  //router.post('/v1/permissions', api.permissions.add);
  //router.put('/v1/permissions/:id', api.permissions.save);
  //router.delete('/v1/permissions/:id', api.permissions.del);

  // Reports
  router.get('/v1/reports', api.reports.findAll);
  router.get('/v1/reports/:id', api.reports.find);
  router.post('/v1/reports', api.reports.add);
  router.put('/v1/reports/:id', api.reports.save);
  router.delete('/v1/reports/:id', api.reports.del);

  // Roles
  router.get('/v1/roles', api.roles.findAll);
  router.get('/v1/roles/:id', api.roles.find);
  //router.post('/v1/roles', api.roles.add);
  //router.put('/v1/roles/:id', api.roles.save);
  //router.delete('/v1/roles/:id', api.roles.del);
  
  // Steps
  router.get('/v1/steps', api.steps.findAll);
  router.get('/v1/steps/:id', api.steps.find);
  router.post('/v1/steps', api.steps.add);
  router.put('/v1/steps/:id', api.steps.save);
  router.delete('/v1/steps/:id', api.steps.del);

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
