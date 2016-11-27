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
        const Connection = models['Connection'];
        const Environment = models['Environment'];
        const IntegrationTemplate = models['IntegrationTemplate'];
        const Organization = models['Organization'];
        const Report = models['Report'];
        const User = models['User'];

        Organization.hasMany(Connection);
        Organization.hasMany(IntegrationTemplate);
        Organization.belongsToMany(Environment, { through: 'EnvironmentsOrganizations' });
        Organization.belongsToMany(Report, {through: 'ReportsOrganizations'});
        Organization.belongsToMany(User, {through: 'UsersOrganizations'});
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
