// Organization model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Organization', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Organization = models['Organization'];
        const Connection = models['Connection'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        Organization.hasMany(Connection);
        Organization.hasMany(IntegrationTemplate);
      }
    }
  }, {
    // Enable timestamps
    timestamps: true
  }, {
    getterMethods: {},
    setterMethods: {}
  });
};
