// Router
'use strict';

module.exports = exports.router = function Route(router, app) {
  var config = require('./config/' + app.get('env') + '.json');

  // API / Data / Actions
  var api = {
    configGroups: require('./src/api/configGroups.js'),
    configs: require('./src/api/configs.js'),
    configTypes: require('./src/api/configTypes.js'),
    permissions: require('./src/api/permissions.js'),
    reports: require('./src/api/reports.js'),
    roles: require('./src/api/roles.js'),
    services: {},
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

  router.get('/v1/configs', api.configs.findAll);
  router.get('/v1/configs/:id', api.configs.find);
  router.post('/v1/configs', api.configs.add);
  router.put('/v1/configs/:id', api.configs.save);
  router.delete('/v1/configs/:id', api.configs.del);

  router.get('/v1/config-groups', api.configGroups.findAll);
  router.get('/v1/config-groups/:id', api.configGroups.find);
  router.post('/v1/config-groups', api.configGroups.add);
  router.put('/v1/config-groups/:id', api.configGroups.save);
  router.delete('/v1/config-groups/:id', api.configGroups.del);

  router.get('/v1/config-types', api.configTypes.findAll);
  router.get('/v1/config-types/:id', api.configTypes.find);
  router.post('/v1/config-types', api.configTypes.add);
  router.put('/v1/config-types/:id', api.configTypes.save);
  router.delete('/v1/config-types/:id', api.configTypes.del);

  router.get('/v1/permissions', api.permissions.findAll);
  router.get('/v1/permissions/:id', api.permissions.find);
  router.post('/v1/permissions', api.permissions.add);
  router.put('/v1/permissions/:id', api.permissions.save);
  router.delete('/v1/permissions/:id', api.permissions.del);

  router.get('/v1/reports', api.reports.findAll);
  router.get('/v1/reports/:id', api.reports.find);
  router.post('/v1/reports/:type', api.reports.add);
  router.put('/v1/reports/:type/:id', api.reports.save);
  router.delete('/v1/reports/:type/:id', api.reports.del);

  router.get('/v1/roles', api.roles.findAll);
  router.get('/v1/roles/:id', api.roles.find);
  router.post('/v1/roles', api.roles.add);
  router.put('/v1/roles/:id', api.roles.save);
  router.delete('/v1/roles/:id', api.roles.del);

  router.get('/v1/users', api.users.findAll);
  router.get('/v1/users/:id', api.users.find);
  router.post('/v1/users', api.users.add);
  router.put('/v1/users/:id', api.users.save);
  router.delete('/v1/users/:id', api.users.del);
};
