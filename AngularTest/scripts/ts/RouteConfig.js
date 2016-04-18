// TODO: move this to a separate file.
app.config(["$stateProvider", "$locationProvider", (stateProvider, locationProvider) => {
        locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        stateProvider
            .state('default', {
            url: '/',
            templateUrl: '/Content/Views/Home.html',
            controller: "HomeController as ctrl"
        });
        stateProvider.state('home', {
            url: '/home',
            templateUrl: '/Content/Views/Home.html',
            controller: "HomeController as ctrl"
        });
        stateProvider.state("otherwise", {
            url: '/',
            templateUrl: '/Content/Views/Home.html',
            controller: "HomeController as ctrl"
        });
    }]);
//# sourceMappingURL=RouteConfig.js.map