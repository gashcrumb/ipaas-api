// Component Model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Component', {
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.TEXT
    },
    icon: {
      type: DataTypes.STRING(50)
    },
    properties: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Component = models['Component'];
        const ComponentGroup = models['ComponentGroup'];
        const Connection = models['Connection'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Tag = models['Tag'];

        Component.belongsTo(ComponentGroup);
        Component.belongsTo(Organization);

        Component.belongsToMany(IntegrationTemplate, { through: 'IntegrationTemplatesComponents' });
        Component.belongsToMany(Tag, { through: 'TagsComponents' });

        Component.hasMany(Connection);
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

