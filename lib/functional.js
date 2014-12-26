var _ = {
  keys : function (o, callback) {
    var k = [];
    for (a in o) {
      if (o.hasOwnProperty(a)) {
        k.push(a);
      }
    }
    if (callback) {
      k.forEach(callback);
    } 
    return k;
  }, 

  unique : function (arr) {
    var set = {};
    arr.forEach(function (e) {
      set[e] = 1;
    });
    return this.keys(set);
  },

  include : function (arr, e) {
    return !!(arr.indexOf(e));
  }
};

module.exports._ = _;
