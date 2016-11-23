
const nodeunit = require('nodeunit');
const _ = require('lodash');
const Models = require('../../src/models');
const db = new Models();
const sequelize = db.sequelize;
const models = db.models;

exports.testConnectionRelationships = function(test) {
  // TODO models are created async, need a way to handle this
  sequelize.sync({ force: true }).then(function() {
    const Connection = models['Connection'];
    const ConnectionType = models['ConnectionType'];
    var connectionType = ConnectionType.build({
      name: 'foo'
    }).save().then(function(connectionType) {
      var connection = Connection.build({
        name: 'bar'
      }).save().then(function(connection) {
        connection.setConnectionType(connectionType).then(function(connection) {
          test.done();
        });
      });
    });
  });
};


