// Role model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report', {
    name: {
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Organization = models['Organization'];
        const Report = models['Report'];
        const User = models['User'];

        Report.belongsToMany(Organization, {through: 'ReportsOrganizations'});
        Report.belongsToMany(User, {through: 'ReportsUsers'});
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
