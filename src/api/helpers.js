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
    includes = _.filter(_.map(includes, (include) => {
      // Do our best to normalize the requested model name
      const name = _.upperFirst(_.camelCase(include));
      if (name in models) {
        return {
          model: models[name]
        };
      } else {
        console.log("Unknown model: ", name);
        return undefined;
      }
    }), function(include) {
      return include !== undefined;
    });
    params.include = includes;
  }

}
