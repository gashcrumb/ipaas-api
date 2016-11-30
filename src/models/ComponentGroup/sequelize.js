// Component Model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ComponentGroup', {
    name: {
      type: DataTypes.STRING(50)
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Component = models['Component'];
        const ComponentGroup = models['ComponentGroup'];

        ComponentGroup.hasMany(Component);
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

