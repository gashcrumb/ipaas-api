// Component Model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ComponentGroup', {
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Component = models['Component'];
        const ComponentGroup = models['ComponentGroup'];

        ComponentGroup.hasMany(Component);

        // Note that ComponentGroups are not configurable at the organizational level.
        // These should be fixed and available as a "type" when an organization decides to
        // offer / create a new Component.
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

