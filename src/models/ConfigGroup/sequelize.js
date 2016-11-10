// ConfigGroup Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ConfigGroup', {
    name: {type: DataTypes.STRING(100)}
  });
};
