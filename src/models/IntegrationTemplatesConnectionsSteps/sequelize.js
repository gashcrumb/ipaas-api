// IntegrationTemplatesConnectionSteps model


// `IntegrationTemplatesConnectionsSteps` is a single JOIN table that relates
// three models: Connections, IntegrationTemplates, and Steps.
// Why is there a model for this? We wanted to define additional attributes
// that are specific to this JOIN table, other than just the model IDs.
// Rachel Yordán <rachel.yordan@redhat.com>

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationTemplatesConnectionsSteps', {
    name: {
      type: DataTypes.STRING(50)
    },
    configuration: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const IntegrationTemplatesConnectionsSteps = models['IntegrationTemplatesConnectionsSteps'];
        const User = models['User'];

        // Add User association that does not seem to be created automatically
        // Alternatively, we could just add UserId as an additional attribute.
        IntegrationTemplatesConnectionsSteps.belongsTo(User);
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
