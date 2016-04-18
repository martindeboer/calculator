module App.AngularTest.Services {
    "use strict";

    export interface ISynchronizationService {

        initialize();
        start(minLength: number, maxLength: number);
        stop();
    }

    class SynchronizationService implements ISynchronizationService {
        mainHub;

        static $inject: string[] = ["$rootScope"];

        constructor(
            private rootScope: angular.IRootScopeService
        ) {


        }

        public initialize()
        {
            this.mainHub = ($.connection as any).mainHub;
            $.connection.hub.start().then(
                () => {

                   
                },
                () => {
                    // TODO: error handling

                });

            this.mainHub.client.newPalinDrome = (palinDrome: string) => {
                console.log("event fired ");
                this.newPalinDrome(palinDrome);
            }
        }

        public start(minLength: number, maxLength: number) {
          
            this.mainHub.server.start(minLength, maxLength);
        }

        public stop()
        {
            this.mainHub.server.stop();
        }

        private newPalinDrome(palinDrome: string) {
            this.rootScope.$broadcast("newPalinDrome", palinDrome);
        }
    }

    angular.module("app").service("SynchronizationService", SynchronizationService);
}