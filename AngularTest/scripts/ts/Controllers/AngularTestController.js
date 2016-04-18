// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    var AngularTest;
    (function (AngularTest) {
        var Controllers;
        (function (Controllers) {
            "use strict";
            /*
             *  This is the overarching project controller that keeps
             *  services like the synchronization-service in the air.
             *
             */
            class AngularTestController {
                constructor(synchronizationService) {
                    this.synchronizationService = synchronizationService;
                    this.activate();
                }
                activate() {
                    this.synchronizationService.initialize();
                }
            }
            AngularTestController.$inject = ["SynchronizationService"];
            angular.module("app").controller("AngularTestController", AngularTestController);
        })(Controllers = AngularTest.Controllers || (AngularTest.Controllers = {}));
    })(AngularTest = App.AngularTest || (App.AngularTest = {}));
})(App || (App = {}));
//# sourceMappingURL=AngularTestController.js.map