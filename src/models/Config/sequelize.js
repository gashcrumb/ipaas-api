// Config Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Config', {
    key: {type: DataTypes.STRING(100)},
    value: {type: DataTypes.STRING(255)}
  }, {
    classMethods: {
      associate: function(models) {
        const Config = models['Config'];
        const ConfigGroup = models['ConfigGroup'];

        Config.belongsTo(ConfigGroup);
      }
    }
  }, {
    typestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
