// Connection Model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Connection', {
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.TEXT
    },
    icon: {
      type: DataTypes.STRING(50)
    },
    configuredProperties: {
      type: DataTypes.TEXT
    },
    position: {
      type: DataTypes.ENUM,
      values: ['Anywhere', 'From', 'To']
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Component = models['Component'];
        const Connection = models['Connection'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Step = models['Step'];
        const Tag = models['Tag'];
        const User = models['User'];

        // Connections should be at the organizational level in
        // case users ever be kicked out or leave the organization.
        Connection.belongsTo(Organization);
        Connection.belongsTo(Component);

        // To keep track of the user that created the connection
        Connection.belongsTo(User);

        // Many-to-many relationships
        // `IntegrationTemplatesConnectionsSteps` is a single JOIN table that relates
        // three models: Connections, IntegrationTemplates, and Steps
        Connection.belongsToMany(IntegrationTemplate, { through: 'IntegrationTemplatesConnectionsSteps' });
        Connection.belongsToMany(Step, { through: 'IntegrationTemplatesConnectionsSteps' });

        Connection.belongsToMany(Tag, { through: 'TagsConnections' });
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

