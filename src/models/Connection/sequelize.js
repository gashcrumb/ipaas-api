// Connection Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Connection', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
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

