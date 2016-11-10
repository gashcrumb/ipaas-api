// History Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('History', {
    action: {type: DataTypes.STRING(255)},
    description: {type: DataTypes.STRING(255)}
  });
};
