// Tag model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {}
    }
  }, {

  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
