// IntegrationPattern model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationPattern', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    icon: {
      type: DataTypes.STRING(50)
    },
    properties: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const IntegrationPattern = models['IntegrationPattern'];
        const IntegrationPatternGroup = models['IntegrationPatternGroup'];
        const Step = models['Step'];

        IntegrationPattern.belongsTo(IntegrationPatternGroup);

        IntegrationPattern.hasMany(Step);
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
