// Environment model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Environment', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Environment = models['Environment'];
        const EnvironmentType = models['EnvironmentType'];
        const Organization = models['Organization'];

        // Environments can be specific to organizations
        // Not sure how useful this is though instead of being just an ENUM column
        Environment.belongsToMany(Organization, { through: 'EnvironmentsOrganizations' });
        Environment.belongsTo(EnvironmentType);
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
