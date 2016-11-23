
const nodeunit = require('nodeunit');
const _ = require('lodash');
const Models = require('../../src/models');
const db = new Models();
const sequelize = db.sequelize;
const models = db.models;

module.exports = {
  setUp: function (callback) {
    sequelize.sync({ force: true }).then(function() {
      const Connection = this.Connection = models['Connection'];
      const ConnectionType = this.ConnectionType = models['ConnectionType'];
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
    Connection
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


