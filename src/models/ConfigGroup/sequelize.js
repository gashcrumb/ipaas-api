// ConfigGroup Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ConfigGroup', {
    key: {type: DataTypes.STRING(100)},
    value: {type: DataTypes.STRING(255)}
  }, {
    classMethods: {
      associate: function(models) {
        const Config = models['Config'];
        const ConfigGroup = models['ConfigGroup'];

        ConfigGroup.hasMany(Config);
      }
    }
  }, {
    typestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
