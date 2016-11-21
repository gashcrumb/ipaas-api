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
        const Connection = models['Connection'];
        const Step = models['Step'];
        const Tag = models['Tag'];
        IntegrationTemplate.hasMany(Connection);
        IntegrationTemplate.hasMany(Step);
        Tag.belongsToMany(IntegrationTemplate, { through: 'TagsIntegrationTemplates' });
        IntegrationTemplate.hasMany(Tag);
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
