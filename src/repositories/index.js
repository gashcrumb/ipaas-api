// Repository Layer
'use strict';

/*
 This file requires all repository files and exports them.
 Each repository should be called individually, likely by a service.
 */


// ---------------------- Repositories ---->>

exports.BaseRepository = require('./BaseRepository.js');
exports.ComponentGroupRepository = require('./ComponentGroupRepository.js');
exports.ComponentRepository = require('./ComponentRepository.js');
exports.ConfigGroupRepository = require('./ConfigGroupRepository.js');
exports.ConfigRepository = require('./ConfigRepository.js');
exports.ConfigTypeRepository = require('./ConfigTypeRepository.js');
exports.ConnectionRepository = require('./ConnectionRepository.js');
exports.EnvironmentRepository = require('./EnvironmentRepository.js');
exports.EnvironmentTypeRepository = require('./EnvironmentTypeRepository.js');
exports.IntegrationRepository = require('./IntegrationRepository.js');
exports.IntegrationPatternRepository = require('./IntegrationPatternRepository.js');
exports.IntegrationPatternGroupRepository = require('./IntegrationPatternGroupRepository.js');
exports.IntegrationRuntimeRepository = require('./IntegrationRuntimeRepository.js');
exports.IntegrationTemplateRepository = require('./IntegrationTemplateRepository.js');
exports.OrganizationRepository = require('./OrganizationRepository.js');
exports.PermissionRepository = require('./PermissionRepository.js');
exports.ReportRepository = require('./ReportRepository.js');
exports.RoleRepository = require('./RoleRepository.js');
exports.StepRepository = require('./StepRepository.js');
exports.TagRepository = require('./TagRepository.js');
exports.UserRepository = require('./UserRepository.js');

