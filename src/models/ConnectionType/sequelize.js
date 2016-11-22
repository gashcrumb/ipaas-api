// ConnectionType model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ConnectionType', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
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
      }
    }
  }, {
    typestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
