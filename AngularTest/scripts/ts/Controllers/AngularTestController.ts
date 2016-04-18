// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App.AngularTest.Controllers {
    "use strict";


    interface IAngularTestController {

    }

    /*
     *  This is the overarching project controller that keeps
     *  services like the synchronization-service in the air.
     *
     */
    class AngularTestController implements IAngularTestController {

        static $inject: string[] =
        ["SynchronizationService"];

        constructor(
            private synchronizationService: App.AngularTest.Services.ISynchronizationService
        ) {
            this.activate();
        }

        activate() {
         
            this.synchronizationService.initialize();
        }

    }
    angular.module("app").controller("AngularTestController", AngularTestController);
}