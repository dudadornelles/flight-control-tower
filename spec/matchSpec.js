var matchAllInbound = require('../lib/match').matchAllInbound,
    matchAllOutbound = require('../lib/match').matchAllOutbound,
    multiline = require('multiline');

describe('match', function () {
  var results;

  beforeEach(function () {
    results = { 
      a: { inbound: [], outbound: [] },
      click: { inbound: [], outbound: [] },
    }
  });

  it('matches all inbound events', function () {
    // given
    var content = multiline(function() {
/*
this.on("b", this.function);
this.on(document, "c", this.function);
this.on("d", function () {
});
this.on(document, "e", function () {
});
this.on('element', 'click', {
'subelementA': this.function,
'subelementB': 'f'
});
this.on("click", 'g');
this.on(this.methodToFindElement(), 'h', this.function);
this.on('uiSwitchPage', function(e, page) {
this.attr[page.name]();
});
*/
    });

    // when
    matchAllInbound(content, results, 'a');

    // then
    expect(results.a.inbound).toContain('b');
    expect(results.a.inbound).toContain('c');
    expect(results.a.inbound).toContain('d');
    expect(results.a.inbound).toContain('e');
    expect(results.a.inbound).toContain('h');
    expect(results.a.inbound).toContain('click');
    expect(results.a.inbound).toContain('uiSwitchPage');

    // outbound events because of 'click'
    expect(results.a.outbound).toContain('f');
    expect(results.a.outbound).toContain('g');
  });

  it('matches complex inbound click events registration (with multiline functions as callbacks)', function () {
    // given
    var content = multiline(function () {
/*
this.on(this.select('replyButtonTop'), 'click', function () {\n this.trigger(document, events.ui.replyBox.showReply);\n }.bind(this));
*/
    });

    // when
    debugger;
    matchAllInbound(content, results, 'a'); 

    // then
    expect(results.a.inbound).toContain('click');
  });

  it('matches all outbound events', function () {
    // given
    var content = multiline(function() {
/*
this.trigger("b", {a: 1});
this.trigger("c", {
  a: 1
});
this.trigger("d", data);
*/
    });

    // when
    matchAllOutbound(content, results, 'a');

    // then
    expect(results.a.outbound).toContain('b');
    expect(results.a.outbound).toContain('c');
    expect(results.a.outbound).toContain('d');
  });

});
