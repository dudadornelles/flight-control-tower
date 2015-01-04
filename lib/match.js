var outboundMatcher = function () { return /\.trigger\((.+)\)/g; };
    inboundMatcher = function () { return /this\.on\((.+)\)/g; };

function matchAll(content, matcher) {
  var result = [],
      match;
  while((match = matcher.exec(content))) {
    result.push(match[1].split(',').map(function (e) { return e.trim(); }));
  }
  return result;
}

function matchAllOutbound(content, results, componentName) {
  matchAll(content, outboundMatcher()).forEach(function (args) {
    if (args[0] == 'document') {
      args.shift();
    }
    results[componentName].outbound.push(args[0]);
  });
}

function matchAllInbound(content, results, componentName) {
  matchAll(content, inboundMatcher()).forEach(function (args) {
    if (args.indexOf("'click'") === -1) { // just register inbound events that are not triggered by clicks
      results[componentName].inbound.push(args[args.length - 2]);
    }
  });
}

module.exports.matchAllInbound = matchAllInbound;
module.exports.matchAllOutbound = matchAllOutbound;

