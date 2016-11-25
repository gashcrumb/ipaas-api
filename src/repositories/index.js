// Repository Layer
'use strict';

/*
 This file requires all repository files and exports them.
 Each repository should be called individually, likely by a service.
 */


// ---------------------- Repositories ---->>

exports.BaseRepository = require('./BaseRepository.js');
exports.ConfigGroupRepository = require('./ConfigGroupRepository.js');
exports.ConfigRepository = require('./ConfigRepository.js');
exports.ConfigTypeRepository = require('./ConfigTypeRepository.js');
exports.ConnectionRepository = require('./ConnectionRepository.js');
exports.ConnectionTypeRepository = require('./ConnectionTypeRepository.js');
exports.EnvironmentKindRepository = require('./EnvironmentKindRepository.js');
exports.EnvironmentRepository = require('./EnvironmentRepository.js');
exports.IntegrationRepository = require('./IntegrationRepository.js');
exports.IntegrationRuntimeRepository = require('./IntegrationRuntimeRepository.js');
exports.IntegrationTemplateRepository = require('./IntegrationTemplateRepository.js');
exports.OrganizationRepository = require('./OrganizationRepository.js');
exports.StepRepository = require('./StepRepository.js');
exports.StepTypeRepository = require('./StepTypeRepository.js');
exports.TagRepository = require('./TagRepository.js');
exports.UserRepository = require('./UserRepository.js');

