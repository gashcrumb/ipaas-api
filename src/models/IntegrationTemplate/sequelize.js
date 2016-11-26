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
        const Integration = models['Integration'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Connection = models['Connection'];
        const Step = models['Step'];
        const Tag = models['Tag'];

        IntegrationTemplate.belongsTo(Organization);
        IntegrationTemplate.belongsToMany(Connection, { through: 'IntegrationTemplatesConnections' });
        IntegrationTemplate.belongsToMany(Step, { through: 'IntegrationTemplatesSteps' });
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
