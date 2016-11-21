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
