// Models

// ---------------------- Dependencies & Setup ---->>

//var config = require('../utils/config');
var Sequelize = require('sequelize');

//console.log('Initializing database connection with Sequelize...');

var app = require('../../server.js');
var config = require('../../config/' + app.get('env') + '.json');


// ---------------------- Database Initialization ---->>

var sequelize = new Sequelize(config['db']['database'], config['db']['username'], config['db']['password'], {
  logging: console.log,
  host: config['db']['options']['host'],
  port: config['db']['options']['port'],
  protocol: config['db']['options']['protocol'],
  maxConcurrentQueries: config['db']['options']['maxConcurrentQueries'],
  dialect: config['db']['options']['dialect'],
  omitNull: config['db']['options']['omitNull'],
  native: config['db']['options']['native'],
  define: {
    underscored: config['db']['options']['define']['underscored'],
    freezeTableName: config['db']['options']['define']['freezeTableName'],
    syncOnAssociation: config['db']['options']['define']['syncOnAssociation'],
    charset: config['db']['options']['define']['charset'],
    collate: config['db']['options']['define']['collate'],
    timestamps: config['db']['options']['define']['timestamps']
  },
  sync: {
    force: config['db']['options']['sync']['force']
  },
  syncOnAssociation: config['db']['options']['syncOnAssociation'],
  pool: {
    maxConnections: config['db']['options']['pool']['maxConnections'],
    maxIdleTime: config['db']['options']['pool']['maxIdleTime']
  },
  language: config['db']['options']['language']
});


// ---------------------- Models ---->>

function Models() {
  if (config['orm'] == 'Sequelize') {
    var Config = sequelize.import(__dirname + '/Config/sequelize.js');
    var ConfigGroup = sequelize.import(__dirname + '/ConfigGroup/sequelize.js');
    var ConfigType = sequelize.import(__dirname + '/ConfigType/sequelize.js');
    var File = sequelize.import(__dirname + '/File/sequelize.js');
    var History = sequelize.import(__dirname + '/History/sequelize.js');
    var Image = sequelize.import(__dirname + '/Image/sequelize.js');
    var Permission = sequelize.import(__dirname + '/Permission/sequelize.js');
    var Report = sequelize.import(__dirname + '/Report/sequelize.js');
    var Role = sequelize.import(__dirname + '/Role/sequelize.js');
    var User = sequelize.import(__dirname + '/User/sequelize.js');
  }

  // Model Associations
  Config.belongsTo(ConfigGroup);
  Config.belongsTo(User);

  ConfigGroup.belongsTo(ConfigType);
  ConfigGroup.hasMany(Config);

  ConfigType.hasMany(ConfigGroup);

  File.belongsTo(User);

  History.belongsTo(User);

  Image.belongsTo(Task);
  Image.belongsTo(User);

  Permission.belongsToMany(Role, {through: 'RolePermissions'});

  Role.belongsToMany(Permission, {through: 'RolePermissions'});
  Role.hasMany(User);

  User.belongsTo(Role);
  User.hasMany(Config);
  User.hasMany(File);
  User.hasMany(History);
  User.hasMany(Image);

  return {
    sequelize: sequelize,
    Config: Config,
    ConfigGroup: ConfigGroup,
    ConfigType: ConfigType,
    File: File,
    History: History,
    Image: Image,
    Permission: Permission,
    Report: Report,
    Role: Role,
    User: User
  };
}

module.exports = Models;

// Export Individual Database Connections
exports.sequelize = sequelize;
