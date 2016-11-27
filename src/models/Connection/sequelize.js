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
        const Connection = models['Connection'];
        const ConnectionType = models['ConnectionType'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Tag = models['Tag'];

        Connection.belongsTo(Organization);
        Connection.belongsTo(ConnectionType);

        Connection.belongsToMany(IntegrationTemplate, { through: 'IntegrationTemplatesConnections' });
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

