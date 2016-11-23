
const nodeunit = require('nodeunit');
const db = require(__dirname + '/setup-models.js');
const sequelize = db.sequelize;
const models = db.models;

const self = {
  setUp: function (callback) {
    db.setUp(function() {
      const Connection = self.Connection = models['Connection'];
      const ConnectionType = self.ConnectionType = models['ConnectionType'];
      var connectionType = ConnectionType.build({
        name: 'foo'
      }).save().then(function(connectionType) {
        var connection = Connection.build({
          name: 'bar'
        }).save().then(function(connection) {
          connection.setConnectionType(connectionType).then(function(connection) {
            callback();
          });
        });
      });
    });
  },
  testConnectionAndConnectionTypeAssociation: function(test) {
    self.Connection
      .findOne({ where: { name: 'bar' }})
      .then(function(connection) {
        test.equals(connection.name, 'bar');
        connection.getConnectionType().then(function(connectionType) {
          test.equals(connectionType.name, 'foo');
          test.done();
        });
      });
  }
};

module.exports = self;


