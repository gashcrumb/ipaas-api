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
exports.HistoryRepository = require('./HistoryRepository.js');
exports.ImageRepository = require('./ImageRepository.js');
exports.PermissionRepository = require('./PermissionRepository.js');
exports.ReportRepository = require('./ReportRepository.js');
exports.RoleRepository = require('./RoleRepository.js');
exports.UserRepository = require('./UserRepository.js');

