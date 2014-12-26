
var walk = require('./walk').walk,
    parse = require('./parse').parse,
    graph = require('./graph').graph,
    render = require('./render').render;


function run(dirToProcess, outputFile) {
  var g = graph(parse(walk(dirToProcess, { filter: '.js$' })));
  render(g, outputFile);
}

module.exports.run = run;
