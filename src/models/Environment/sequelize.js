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
