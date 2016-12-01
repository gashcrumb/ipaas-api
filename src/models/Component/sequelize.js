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
    },
    remaining: {
      type: DataTypes.STRING(50)
    },
    uri: {
      type: DataTypes.STRING(50)
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Component = models['Component'];
        const ComponentGroup = models['ComponentGroup'];
        const Connection = models['Connection'];

        Component.belongsTo(ComponentGroup);

        // Configured Components are called Connections
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

