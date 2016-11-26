// IntegrationRuntime model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationRuntime', {
    state: {
      type: DataTypes.ENUM,
      // TODO define these
      values: ['draft', 'running', 'stopped', 'error']
    }
  }, {
    classMethods: {
      associate: function(models) {
        const Integration = models['Integration'];
        const IntegrationRuntime = models['IntegrationRuntime'];
        const Environment = models['Environment'];

        IntegrationRuntime.belongsTo(Environment);
        IntegrationRuntime.belongsTo(Integration);
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
