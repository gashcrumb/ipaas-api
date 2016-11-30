// Integration model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Integration', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    configuration: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Integration = models['Integration'];
        const IntegrationRuntime = models['IntegrationRuntime'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Project = models['Project'];
        const Tag = models['Tag'];
        const User = models['User'];

        // Integrations are all created from a template of some type
        Integration.belongsTo(IntegrationTemplate);

        // Keep track of the project this was created for
        Integration.belongsTo(Project);

        // Keep track of who created this Integration
        Integration.belongsTo(User);

        // Many-to-many relationships
        Integration.belongsToMany(Tag, { through: 'TagsIntegrations' });
        Integration.belongsToMany(User, { through: 'UsersIntegrations' });

        Integration.hasMany(IntegrationRuntime);
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
