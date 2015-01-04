
var _ = require('lodash');

function graph(results) {
  var g = [];
  _.keys(results).forEach(function (componentName) {
    var componentEvents = results[componentName];
    componentEvents.inbound.forEach(function (ev) {
      _.keys(results, function (nextComponentName) {
        var nextComponentEvents = results[nextComponentName];
        if (componentName !== nextComponentName) {
          if (nextComponentEvents.outbound.indexOf(ev) > 0) {
            g.push({
              source: nextComponentName,
              target: componentName,
              eventName: ev
            });
          }
        }
      });
    });
    componentEvents.outbound.forEach(function (ev) {
      _.keys(results).forEach(function (nextComponentName) {
        var nextComponentEvents = results[nextComponentName];
        if (componentName !== nextComponentName) {
          if (nextComponentEvents.inbound.indexOf(ev) >= 0) {
            g.push({
              source: componentName, 
              target: nextComponentName,
              eventName: ev
            });
          }
        }
      });
    });
  });
  return g;
}

module.exports.graph = graph;
