var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var _ = require('lodash');

var ast = esprima.parse(fs.readFileSync('/Users/ddornell/work/flightjs/flight-chat/app/js/component_ui/form_submit.js').toString());

var getEventNameOn = {
  'Literal': function () {},
  'ObjectExpression': function () {},
  'MemberExpression': function () {},
}

var getEventNameTrigger = {
  'Literal': function () {},
  'ObjectExpression': function () {},
  'MemberExpression': function () {},
}

estraverse.traverse(ast, {
  enter: function (node, parent) {
    if (node.type == 'CallExpression') {
      if (node.callee.object && node.callee.object.type == 'ThisExpression' && node.callee.property.name == 'on') {
        _.each(node.arguments, function (arg) {
          var eventName = getEventNameOn[arg]()
          console.log(eventName)
        });
      }
      if (node.callee.object && node.callee.object.type == 'ThisExpression' && node.callee.property.name == 'trigger') {
        _.each(node.arguments, function (arg) {
          var eventName = getEventNameTrigger[arg]()
          console.log(eventName)
        });
      }
    }
  }
});

