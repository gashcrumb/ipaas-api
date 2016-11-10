// Report Model

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report', {
    date: {type: DataTypes.DATE},
    description: {type: DataTypes.TEXT},
    name: {type: DataTypes.STRING(255)},
    notes: {type: DataTypes.TEXT},
    status: {type: DataTypes.STRING(100)},
    type: {type: DataTypes.STRING(100)}
  });
};
