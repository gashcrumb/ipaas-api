// Tag model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Connection = models['Connection'];
        const Integration = models['Integration'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Tag = models['Tag'];

        Tag.belongsToMany(Connection, { through: 'TagsConnections' });
        Tag.belongsToMany(Integration, { through: 'TagsIntegrations' });
        Tag.belongsToMany(IntegrationTemplate, { through: 'TagsIntegrationTemplates' });
      }
    }
  }, {

  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
