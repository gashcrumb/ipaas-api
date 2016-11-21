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
        const EnvironmentKind = models['EnvironmentKind'];
        const Organization = models['Organization'];
        Environment.belongsToMany(Organization, { through: 'EnvironmentsOrganizations' });
        Environment.hasOne(EnvironmentKind, { as: 'Type' });
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
