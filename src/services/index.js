// Services
'use strict';

/*
 Services act as an intermediary between the controllers layer and the repositories layer.
 This file imports each service file and exports them for external use.
 */

//var fs = require('fs');
//var path = require('path');

// ---------------------- Services ---->>

exports.ConfigGroupService = require('./ConfigGroupService.js');
exports.ConfigService = require('./ConfigService.js');
exports.ConfigTypeService = require('./ConfigTypeService.js');
exports.ConnectionService = require('./ConnectionService.js');
exports.ConnectionTypeService = require('./ConnectionTypeService.js');
exports.EnvironmentService = require('./EnvironmentService.js');
exports.EnvironmentTypeService = require('./EnvironmentTypeService.js');
exports.IntegrationService = require('./IntegrationService.js');
exports.IntegrationRuntimeService = require('./IntegrationRuntimeService.js');
exports.IntegrationTemplateService = require('./IntegrationTemplateService.js');
exports.OrganizationService = require('./OrganizationService.js');
exports.PermissionService = require('./PermissionService.js');
exports.ProjectService = require('./ProjectService.js');
exports.ReportService = require('./ReportService.js');
exports.RoleService = require('./RoleService.js');
exports.StepService = require('./StepService.js');
exports.StepTypeService = require('./StepTypeService.js');
exports.TagService = require('./TagService.js');
exports.UserService = require('./UserService.js');

/*
// Attempt at dynamic requires, likely not safe or possible in Node.js
var files = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    // Check for each file, only accepting those that end in 'Service.js',
    // with the exceptions of 'ExampleService.js', 'BaseService.js', and 'index.js'
    console.log('Last 10 characters of file name: ' + file.substr(file.length - 10));

    return (file.substr(file.length - 10) === 'Service.js')
      && (file !== 'BaseService.js')
      && (file !== 'ExampleService.js')
      && (file !== 'index.js')
      && (file.indexOf('.') !== 0);
  })
  .forEach(function(file) {
    console.log('File accepted: ' + JSON.stringify(file));
    console.log('Path: ' + JSON.stringify(path.join(__dirname, file)));

    files.file = require(path.join(__dirname, file));

    console.log('Files: ' + JSON.stringify(files));
  });

exports = files;

console.log('Exports: ' + JSON.stringify(exports));
*/


