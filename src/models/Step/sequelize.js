// Step model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Step', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    },
    configuredProperties: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {}
    }
  }, {
    // Enable timestamps
    timestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
