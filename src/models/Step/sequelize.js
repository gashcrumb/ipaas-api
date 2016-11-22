// Step model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Step', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    configuredProperties: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Step = models['Step'];
        const StepType = models['StepType'];

        Step.hasOne(StepType);
        StepType.belongsTo(Step);
      
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
