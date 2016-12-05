'use strict';

// ---------------------- Dependencies ---->>
const _ = require('lodash');

exports.applyModelIncludes = function(params, req, models) {
  var includes = [];
  // ie: ?include=category&include=file&include=image
  if (req.query.include) {
    var include = req.query.include;
    if (_.isArray(include)) {
      includes = _.clone(req.query.include);
    } else {
      includes.push(include);
    }
    includes = _.map(includes, (include) => {
      return {
        model: models[_.capitalize(include)]
      };
    });
    params.include = includes;
  }

}
