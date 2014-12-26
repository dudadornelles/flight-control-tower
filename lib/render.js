
var fs = require('fs'),
    path = require('path');

function render(graph, output) {
  var templatePath = path.join(path.dirname(module.filename), '..', 'views', 'flight-control-tower.html.template'),
      fileContent = fs.readFileSync(templatePath, 'utf-8'),

      d3Path = path.join(path.dirname(module.filename), '..', 'views', 'd3.js'),
      d3Content = fs.readFileSync(d3Path, 'utf-8'),

      toWrite = fileContent.replace('<%=graph=%>', JSON.stringify(graph)).replace('<%=d3=%>', d3Content);

  fs.writeFileSync(output, toWrite);
}

module.exports.render = render;

