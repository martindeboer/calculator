// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    var AngularTest;
    (function (AngularTest) {
        var Controllers;
        (function (Controllers) {
            "use strict";
            class VirtualList {
                getItemAtIndex(index) {
                    return null;
                }
                getLength() {
                    return 0;
                }
            }
            class HomeController {
                constructor($scope, rootScope, synchronizationService) {
                    this.$scope = $scope;
                    this.rootScope = rootScope;
                    this.synchronizationService = synchronizationService;
                    this.activate();
                }
                activate() {
                    this.palinDromes = [];
                    this.registerCallBacks();
                    this.running = false;
                    // Under normal circumstances I would move this to an overarching project controller
                }
                registerCallBacks() {
                    this.rootScope.$on("newPalinDrome", (event, palinDrome) => {
                        this.newPalinDrome(palinDrome);
                    });
                }
                newPalinDrome(palinDrome) {
                    this.rootScope.$apply(() => {
                        this.addPalinDrome(palinDrome);
                    });
                }
                addPalinDrome(palinDrome) {
                    var newPalinDrome = [palinDrome];
                    var endIndex = Math.min(20, this.palinDromes.length);
                    var buffer = this.palinDromes.slice(0, endIndex);
                    this.palinDromes = newPalinDrome.concat(buffer);
                }
                cmdStartOnClick() {
                    this.synchronizationService.start(this.minLength, this.maxLength);
                    this.running = true;
                }
                cmdStopOnClick() {
                    this.synchronizationService.stop();
                    this.running = false;
                }
                minChanged() {
                    if (this.minLength > this.maxLength) {
                        this.maxLength = this.minLength;
                    }
                }
                maxChanged() {
                    if (this.maxLength < this.minLength) {
                        this.minLength = this.maxLength;
                    }
                }
                validInput() {
                    if (this.minLength >= 1 && this.maxLength > this.minLength) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            HomeController.$inject = ["$scope", "$rootScope", "SynchronizationService"];
            angular.module("app").controller("HomeController", HomeController);
        })(Controllers = AngularTest.Controllers || (AngularTest.Controllers = {}));
    })(AngularTest = App.AngularTest || (App.AngularTest = {}));
})(App || (App = {}));
//# sourceMappingURL=HomeController.js.map