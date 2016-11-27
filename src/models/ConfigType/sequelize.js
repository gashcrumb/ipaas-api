// ConfigType Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ConfigType', {
    key: {type: DataTypes.STRING(100)},
    value: {type: DataTypes.STRING(255)}
  }, {
    classMethods: {
      associate: function(models) {
        const ConfigGroup = models['ConfigGroup'];
        const ConfigType = models['ConfigType'];

        ConfigType.hasMany(ConfigGroup);
      }
    }
  }, {
    typestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
