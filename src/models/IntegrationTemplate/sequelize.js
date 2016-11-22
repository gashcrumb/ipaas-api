// IntegrationTemplate model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationTemplate', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    stepOrder: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Connection = models['Connection'];
        const Step = models['Step'];
        const Tag = models['Tag'];

        IntegrationTemplate.belongsTo(Organization);
        Organization.hasMany(IntegrationTemplate);

        Connection.belongsToMany(IntegrationTemplate, { through: 'IntegrationTemplatesConnections' });
        IntegrationTemplate.belongsToMany(Connection, { through: 'IntegrationTemplatesConnections' });

        Step.belongsToMany(IntegrationTemplate, { through: 'IntegrationTemplatesSteps' });
        IntegrationTemplate.belongsToMany(Step, { through: 'IntegrationTemplatesSteps' });

        Tag.belongsToMany(IntegrationTemplate, { through: 'TagsIntegrationTemplates' });
        IntegrationTemplate.belongsToMany(Tag, { through: 'TagsIntegrationTemplates' });
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
