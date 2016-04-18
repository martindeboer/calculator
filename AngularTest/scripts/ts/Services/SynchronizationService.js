var App;
(function (App) {
    var AngularTest;
    (function (AngularTest) {
        var Services;
        (function (Services) {
            "use strict";
            class SynchronizationService {
                constructor(rootScope) {
                    this.rootScope = rootScope;
                }
                initialize() {
                    this.mainHub = $.connection.mainHub;
                    $.connection.hub.start().then(() => {
                    }, () => {
                        // TODO: error handling
                    });
                    this.mainHub.client.newPalinDrome = (palinDrome) => {
                        console.log("event fired ");
                        this.newPalinDrome(palinDrome);
                    };
                }
                start(minLength, maxLength) {
                    this.mainHub.server.start(minLength, maxLength);
                }
                stop() {
                    this.mainHub.server.stop();
                }
                newPalinDrome(palinDrome) {
                    this.rootScope.$broadcast("newPalinDrome", palinDrome);
                }
            }
            SynchronizationService.$inject = ["$rootScope"];
            angular.module("app").service("SynchronizationService", SynchronizationService);
        })(Services = AngularTest.Services || (AngularTest.Services = {}));
    })(AngularTest = App.AngularTest || (App.AngularTest = {}));
})(App || (App = {}));
//# sourceMappingURL=SynchronizationService.js.map