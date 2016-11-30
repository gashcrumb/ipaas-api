// IntegrationTemplate model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationTemplate', {
    name: {
      type: DataTypes.STRING(50)
    },
    configuration: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Component = models['Component'];
        const Connection = models['Connection'];
        const Integration = models['Integration'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Step = models['Step'];
        const Tag = models['Tag'];
        const User = models['User'];

        // IntegrationTemplates are created at the organizational level in the event
        // that a user leaves the organization.
        IntegrationTemplate.belongsTo(Organization);

        // But we still want to keep track of who created it. :)
        IntegrationTemplate.belongsTo(User);

        // Many-to-many relationships
        // `IntegrationTemplatesConnectionsSteps` is a single JOIN table that relates
        // three models: Connections, IntegrationTemplates, and Steps
        IntegrationTemplate.belongsToMany(Connection, { through: 'IntegrationTemplatesConnectionsSteps' });
        IntegrationTemplate.belongsToMany(Step, { through: 'IntegrationTemplatesConnectionsSteps' });

        IntegrationTemplate.belongsToMany(Tag, { through: 'TagsIntegrationTemplates' });

        IntegrationTemplate.hasMany(Integration);
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
