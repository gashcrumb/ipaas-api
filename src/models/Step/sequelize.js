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
        const Connection = models['Connection'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Step = models['Step'];
        const StepType = models['StepType'];

        Step.belongsTo(StepType);

        // Many-to-many relationships
        // `IntegrationTemplatesConnectionsSteps` is a single JOIN table that relates
        // three models: Connections, IntegrationTemplates, and Steps
        Step.belongsToMany(Connection, { through: 'IntegrationTemplatesConnectionsSteps' });
        Step.belongsToMany(IntegrationTemplate, { through: 'IntegrationTemplatesConnectionsSteps' });
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
