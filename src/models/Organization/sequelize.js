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
        const Project = models['Project'];
        const Report = models['Report'];
        const User = models['User'];

        // Organization-level models in case users ever leave
        Organization.hasMany(Connection);
        Organization.hasMany(IntegrationTemplate);
        Organization.hasMany(Project);

        // Many-to-many relationships
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
