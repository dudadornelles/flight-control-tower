
var walk = require('./walk').walk,
    parse = require('./parse').parse,
    graph = require('./graph').graph,
    render = require('./render').render;


function run(dirToProcess, outputFile) {
  var a = parse(walk(dirToProcess, { filter: '.js$' }));
  console.log(a);
  var g = graph(a);
  render(g, outputFile);
}

module.exports.run = run;
