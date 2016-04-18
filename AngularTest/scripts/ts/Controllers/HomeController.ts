// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App.AngularTest.Controllers {
    "use strict";
   

    interface IHomeController {
       
    }

    class VirtualList
    {
        getItemAtIndex(index: number): any
        {
            return null;
        }
        getLength(): number {
            return 0;
        }
    }


    class HomeController implements IHomeController {
        palinDromes: string[];
        minLength: number;
        maxLength: number;
        running: boolean;

        static $inject: string[] =
        ["$scope", "$rootScope", "SynchronizationService"];

        constructor(
            private $scope: ng.IScope,
            private rootScope: angular.IRootScopeService,
            private synchronizationService: App.AngularTest.Services.ISynchronizationService
        )
        {
            this.activate();
        }
       
        activate()
        {
            this.palinDromes = [];
            this.registerCallBacks();
            this.running = false;
            // Under normal circumstances I would move this to an overarching project controller
        }

        registerCallBacks()
        {
            this.rootScope.$on("newPalinDrome", (event, palinDrome: string) => {
                this.newPalinDrome(palinDrome);
            });
        }

        newPalinDrome(palinDrome: string)
        {
            this.rootScope.$apply(() => {
                this.addPalinDrome(palinDrome);
            });
        }

        addPalinDrome(palinDrome: string)
        {
            var newPalinDrome: string[] = [palinDrome];

            var endIndex = Math.min(20, this.palinDromes.length);

            var buffer = this.palinDromes.slice(0, endIndex);
            this.palinDromes = newPalinDrome.concat(buffer);
        }

        cmdStartOnClick()
        {
            this.synchronizationService.start(this.minLength, this.maxLength);
            this.running = true;
        }

        cmdStopOnClick()
        {
            this.synchronizationService.stop();
            this.running = false;
        }

        minChanged()
        {
            if (this.minLength > this.maxLength)
            {
                this.maxLength = this.minLength;
            }
        }

        maxChanged()
        {
            if (this.maxLength < this.minLength)
            {
                this.minLength = this.maxLength;
            }
        }

        validInput(): boolean
        {
            if (this.minLength >= 1 && this.maxLength > this.minLength) {
                return true;
            } else
            {
                return false;
            }
        }

    }
    angular.module("app").controller("HomeController", HomeController);
}