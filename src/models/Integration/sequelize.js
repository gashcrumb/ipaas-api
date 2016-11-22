// Integration model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Integration', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    configuration: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Integration = models['Integration'];
        const IntegrationRuntime = models['IntegrationRuntime'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const User = models['User'];
        const Tag = models['Tag'];

        Integration.belongsToMany(User, { through: 'UsersIntegrations' });
        User.belongsToMany(Integration, { through: 'UsersIntegrations' });

        Integration.hasMany(IntegrationRuntime);

        Integration.belongsTo(IntegrationTemplate);
        IntegrationTemplate.hasMany(Integration);

        Tag.belongsToMany(Integration, { through: 'TagsIntegrations' });
        Integration.belongsToMany(Tag, { through: 'TagsIntegrations' });
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
