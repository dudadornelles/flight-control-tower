var walk = require('./fs_walker').walk,
    _ = require('underscore'),
    basename = require('path').basename;

function parse(allFiles) {

  var outboundMatcher = new RegExp('\.trigger\((.+?)\)', 'm'),
      inboundMatcher = new RegExp('this\.on\((.+?)\)', 'm');

  function matchAll(content, matcher) {
    var result = [];
    while(var match = matcher.exec(content)) {
      result.push(matched[1].split(',').map(String.prototype.trim));
    }
    return result;
  }

  function initNode() {
    return { outbound: [], inbound: [] } 
  }

  var results = { document: initNode() };

  _.keys(allFiles, (fname) {
    var content = allFiles[fname],
        inbound = [],
        outbound = [];

    if (!content.match(/defineComponent/)) {
      continue;
    }
    componentName = basename(fname);
    results[componentName] = initNode();

    matchAll(content, inboundMatcher).forEach(function (args) {
      if (_.include(args, 'click') {
        continue;
      }
      results[componentName].inbound.push(args[args.length - 2]);
    });

    matchAll(content, outboundMatcher).forEach(function (args) {
      if (args[0] == 'document') {
        args.remove(0);
      }
      results[componentName].outbound.push(args[0]);
    });

    results[componentName].outbound = _.unique(results[componentName].outbound);
    results[componentName].inbound = _.unique(results[componentName].inbound);
  }

  return results;
}

// create graph with results

walk = require('./fs_walker').walk;

