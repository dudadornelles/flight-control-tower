
var matchAllInbound = require('../lib/match').matchAllInbound,
    matchAllOutbound = require('../lib/match').matchAllOutbound,
    multiline = require('multiline').multiline;

describe('match', function () {
  /* app/component_data/compose_box.js:        this.on("uiComposeBoxRequested", this.serveComposeBox);
   * app/component_data/compose_box.js:        this.on("uiSendRequested", this.send);
   * app/component_data/mail_items.js:        thisContact = this.attr.dataStore.contacts.filter(function(contact) {
   * app/component_data/mail_items.js:        thisItem.name = [thisContact.firstName, thisContact.lastName].join(' ');
   * app/component_data/mail_items.js:        this.on("uiMailItemsRequested", this.serveMailItems);
   * app/component_data/mail_items.js:        this.on("dataMailItemsRefreshRequested", this.serveMailItems);
   * app/component_data/move_to.js:        this.on("uiAvailableFoldersRequested", this.serveAvailableFolders);
   * app/component_data/move_to.js:        this.on("uiMoveItemsRequested", this.moveItems);
   * app/component_ui/compose_box.js:        this.on(document, 'dataComposeBoxServed', this.launchComposeBox);
   * app/component_ui/compose_box.js:        this.on(document, 'uiForwardMail', this.forward);
   * app/component_ui/compose_box.js:        this.on(document, 'uiReplyToMail', this.reply);
   * app/component_ui/compose_box.js:        this.on(document, 'uiMailItemSelectionChanged', this.updateMailItemSelections);
   * app/component_ui/compose_box.js:        this.on(document, 'uiFolderSelectionChanged', this.updateFolderSelections);
   * app/component_ui/folders.js:        this.on('uiFolderSelectionChanged', this.fetchMailItems);
   * app/component_ui/mail_controls.js:        this.on(document, 'uiMailItemSelectionChanged', this.restyleOnSelectionChange);
   * app/component_ui/mail_controls.js:        this.on(document, 'uiFolderSelectionChanged', this.disableAll);
   * app/component_ui/mail_items.js:        this.on(document, 'dataMailItemsServed', this.renderItems);
   * app/component_ui/mail_items.js:        this.on(document, 'uiDeleteMail', this.requestDeletion);
   * app/component_ui/mail_items.js:        this.on('uiMailItemSelectionChanged', this.updateMailItemSelections);
   * app/component_ui/mail_items.js:        this.on(document, 'uiFolderSelectionChanged', this.updateFolderSelections);
   * app/component_ui/move_to_selector.js:            this.on(document, 'click', this.hideSelector)
   * app/component_ui/move_to_selector.js:        this.on(document, 'uiMoveMail', this.requestSelectorWidget);
   * app/component_ui/move_to_selector.js:        this.on(document, 'dataMoveToItemsServed', this.launchSelector);
   * app/component_ui/move_to_selector.js:        this.on(document, 'uiMailItemSelectionChanged', this.updateMailItemSelections);
   * app/component_ui/move_to_selector.js:        this.on(document, 'uiFolderSelectionChanged', this.updateFolderSelections);
   * app/component_ui/move_to_selector.js:        this.on('uiMoveToSelectionChanged', this.requestMoveTo);
   */
  it('matches all inbound events', function () {
    results = {}
    matchAllInbound('this.on("uiComposeBoxRequested", this.serveComposeBox);', results, 'a');
    expect(results.a.inbound).toEqual(["uiComposeBoxRequested"]);
  });

});
