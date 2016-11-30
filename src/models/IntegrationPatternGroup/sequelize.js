// IntegrationPatternGroup model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationPatternGroup', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const IntegrationPattern = models['IntegrationPattern'];
        const IntegrationPatternGroup = models['IntegrationPatternGroup'];

        IntegrationPatternGroup.hasMany(IntegrationPattern);
      }
    }
  }, {
    // Enable timestamps
    timestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
