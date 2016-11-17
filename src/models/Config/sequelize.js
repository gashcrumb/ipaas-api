// Config Model

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Config', {
        description: {type: DataTypes.STRING(100)},
        value: {type: DataTypes.STRING(255)}
    });
};
