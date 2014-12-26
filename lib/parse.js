
var basename = require('path').basename,
    _ = require('./functional')._;

function parse(allFiles) {

  var outboundMatcher = function () { return /\.trigger\((.+)\)/g; };
      inboundMatcher = function () { return /this\.on\((.+)\)/g; };

  function matchAll(content, matcher) {
    var result = [],
        match;
    while((match = matcher.exec(content))) {
      result.push(match[1].split(',').map(function (e) { return e.trim() }));
    }
    return result;
  }

  function initNode() {
    return { outbound: [], inbound: [] } 
  }

  var results = { document: initNode() };

  _.keys(allFiles, function (fname) {
    var content = allFiles[fname],
        inbound = [],
        outbound = [];

    if (content.match(/defineComponent/)) {

      componentName = basename(fname);
      results[componentName] = initNode();

      matchAll(content, inboundMatcher()).forEach(function (args) {
        if (args.indexOf("'click'") === -1) { // just register inbound events that are not triggered by clicks
          results[componentName].inbound.push(args[args.length - 2]);
        }
      });

      matchAll(content, outboundMatcher()).forEach(function (args) {
        if (args[0] == 'document') {
          args.shift();
        }
        results[componentName].outbound.push(args[0]);
      });

      results[componentName].outbound = _.unique(results[componentName].outbound);
      results[componentName].inbound = _.unique(results[componentName].inbound);
    }
  });

  return results;
}

module.exports.parse = parse;

