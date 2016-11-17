// ConfigType Model

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ConfigType', {
        name: {type: DataTypes.STRING(100)},
        description: {type: DataTypes.TEXT}
    });
};
