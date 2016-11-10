module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Permission", {
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [2, 50]
        }
      }
    },
    {
      paranoid: true
    });
};
