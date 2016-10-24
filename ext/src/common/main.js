function MyExtension() {
    var self = this;
    kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
        self._onCommand();
    });
}

MyExtension.prototype = {

    _onCommand: function() {
        kango.browser.tabs.create({url: 'https://www.kadeutsch.org/khan-academy-fuer-fluechtlinge/'});
    }
};

var extension = new MyExtension();