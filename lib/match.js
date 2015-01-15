var _ = require('lodash');

var outboundMatcher = function () { return /\.trigger\(([\s\S]+?)\)/g; };
    inboundMatcher = function () { return /this\.on\(([\s\S]+?)\);/g; };

function initNode() {
  return { outbound: [], inbound: [] }; 
}

function normalize(s) {
  return s.replace(/^['"]/, '').replace(/['"]$/, ''); 
}

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
    results[componentName].outbound.push(normalize(args[0]));
  });
}

function matchAllInbound(content, results, componentName) {
  var indexOfClick;
  matchAll(content, inboundMatcher()).forEach(function (args) {
    
    if ((indexOfClick = _.map(args, normalize).indexOf('click')) >= 0) { 
      results[componentName].inbound.push('click');

      var handler = eval('[' + args.slice(indexOfClick + 1).join() + ']')[0];
      if (typeof handler === 'object') {
        _.keys(handler).forEach(function (e) {
          if (typeof handler[e] == 'string') {
            results[componentName].outbound.push(normalize(handler[e]));
          }
        });
      }
      if (typeof handler === 'string') {
        results[componentName].outbound.push(normalize(handler));
      }
    }
    else {
      results[componentName].inbound.push(normalize(args[args.length - 2]));
    }
  });
}

module.exports.matchAllInbound = matchAllInbound;
module.exports.matchAllOutbound = matchAllOutbound;

