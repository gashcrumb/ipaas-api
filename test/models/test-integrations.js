
const nodeunit = require('nodeunit');
const db = require(__dirname + '/setup-models.js');
const sequelize = db.sequelize;
const models = db.models;

const self = {
  setUp: function (callback) {
    db.setUp(function() {
      const Integration = self.Integration = models['Integration'];
      Integration.build({
        name: 'foo'
      }).save().then(function(integration) {
        callback();
      });
    });
  },
  testIntegration: function(test) {
    self.Integration
      .findOne({ where: { name: 'foo' }})
      .then(function(integration) {
        test.equals(integration.name, 'foo');
        test.done();
      });
  }
};

module.exports = self;
