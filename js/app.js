(function () {

    angular.module('Main', ['ngRoute', 'main-directives', 'main-controllers', 'main-services'])

        .config(function ($routeProvider) {

            $routeProvider
                .when("/", {
                    templateUrl: "templates/river/index.html",
                    controller: 'RiverController',
                    controllerAs: "riverCtrl"
                })
                .when('/single/:id', {
                    templateUrl: 'templates/single/index.html',
                    controller: 'PostIndexController',
                    controllerAs: "postIndexCtrl"
                })
                .when('/username', {
                    templateUrl: 'templates/username/index.html'
                })
                .when("/river", {
                    redirectTo: "/"
                });
        });


})();
