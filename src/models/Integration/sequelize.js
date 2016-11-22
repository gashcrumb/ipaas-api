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
        const Tag = models['Tag'];
        Integration.hasMany(IntegrationRuntime);
        Integration.hasOne(IntegrationTemplate);
        /*
        Tag.belongsToMany(Integration, { through: 'TagsIntegrations' });
        Integration.hasMany(Tag);
        */
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
