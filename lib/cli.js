
var walk = require('./walk').walk,
    parse = require('./parse').parse,
    graph = require('./graph').graph;


function run(dirToProcess) {
  console.log(graph(parse(walk(dirToProcess, { filter: '.js$' }))));
}

module.exports.run = run;
