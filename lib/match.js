var _ = require('lodash'),
  esprima = require('esprima'),
  estraverse = require('estraverse');

function handlers(results, componentName) {
  return {
    inboundIsFirst: function (args) {
      results[componentName].inbound.push(getName(args[0]));
    },
    inboundIsSecond: function (args) {
      results[componentName].inbound.push(getName(args[1]));
    },
    outboundIsFirst: function (args) {
      results[componentName].outbound.push(getName(args[0]));
    },
    outboundIsSecond: function (args) {
      results[componentName].outbound.push(getName(args[1]));
    },
    outboundIsThird: function (args) {
      results[componentName].outbound.push(getName(args[2]));
    },
    extractOutboundEventsFromObject: function (node) {
      _.each(node.properties, function (n) {
        if (n.value.type === 'Literal') {
          results[componentName].outbound.push(n.value.value);
        }
      });
    }
  };
}

function getName(node) {
  if (node.type == 'Literal') {
    return node.value;
  }
  if (node.type == 'Identifier') {
    return node.name;
  }
  if (node.object.type == 'Identifier') {
    return node.object.name;
  }
  return node.property.name + '.' + getName(node.object)
}

function isEventRegistrationExpression(node, eventType) {
  return node.type === 'CallExpression' && 
    node.callee.object && 
    node.callee.object.type === 'ThisExpression' && 
    node.callee.property.name === eventType
}

function matchAllInbound(content, results, componentName) {
  var ast = esprima.parse(content),
      h = handlers(results, componentName);

  estraverse.traverse(ast, { enter: function (node, parent) {
    if (isEventRegistrationExpression(node, 'on')) {
      var registrationType = _.pluck(node.arguments, 'type').join(', ');

      var extractEventHandler = {
        'Literal, MemberExpression': h.inboundIsFirst,
        'Identifier, Literal, MemberExpression': h.inboundIsSecond,
        'Literal, FunctionExpression': h.inboundIsFirst,
        'Identifier, Literal, FunctionExpression': h.inboundIsSecond,
        'Literal, Literal, FunctionExpression': h.inboundIsSecond,
        'CallExpression, Literal, MemberExpression': h.inboundIsSecond,
        'CallExpression, Literal, CallExpression': h.inboundIsSecond,
        'Literal, Literal, ObjectExpression': function (args) {
          h.inboundIsSecond(args);
          h.extractOutboundEventsFromObject(args[2]);
        },
        'Literal, Literal': function (args) {
          h.inboundIsFirst(args);
          h.outboundIsSecond(args);
        },

        'Literal, Literal, Literal': function (args) {
          h.inboundIsSecond(args);
          h.outboundIsThird(args);
        }
      };

      extractEventHandler[registrationType](node.arguments);
    }
  }});
}

function matchAllOutbound(content, results, componentName) {
  var ast = esprima.parse(content),
      h = handlers(results, componentName);

  estraverse.traverse(ast, { enter: function (node, parent) {
    if (isEventRegistrationExpression(node, 'trigger')) {
      var registrationType = _.pluck(node.arguments, 'type').join(', ');

      var extractEventHandler = {
        'Literal, ObjectExpression': h.outboundIsFirst,
        'Identifier, ObjectExpression': h.outboundIsFirst,
        'Identifier, Literal, ObjectExpression': h.outboundIsSecond,
        'Literal': h.outboundIsFirst,
        'Identifier, Literal': h.outboundIsSecond
      }
      extractEventHandler[registrationType](node.arguments);
    }
  }});
}

module.exports.matchAllInbound = matchAllInbound;
module.exports.matchAllOutbound = matchAllOutbound;

