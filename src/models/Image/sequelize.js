// Image Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Image', {
    path: {type: DataTypes.STRING(255)},
    primary: {type: DataTypes.BOOLEAN},
    title: {type: DataTypes.STRING(255)},
    type: {type: DataTypes.STRING(50)},
    url: {type: DataTypes.STRING(255)}
  });
};
