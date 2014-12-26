
var fs = require('fs'),
    join = require('path').join,
    extend = require('util')._extend,
    content;

function walk(dir, opts) {
  var allFiles = {},
      filter = opts && opts.filter && new RegExp(opts.filter);
  fs.readdirSync(dir).map(function (f) {
    var file = join(dir, f)
    if (fs.statSync(file).isDirectory()) {
      extend(allFiles, walk(file, opts));
    } else {
      if (filter && filter.test(file)) {
        content = fs.readFileSync(file, 'utf-8');
        allFiles[file] = content
      }
    }
  });
  return allFiles;
}

module.exports.walk = walk;

